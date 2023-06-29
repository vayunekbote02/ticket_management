require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { UserData, Ticket } = require("./mongo");
const CsvParser = require("json2csv").Parser;
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const authenticateToken = require("./JWT");

const server = express();

server.use(express.json());
server.use(cors());
server.use(cookieParser());

/*Used for signing up a new user.*/
server.post("/signup", async (req, res) => {
  try {
    // Generate a salt and hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user object with the encrypted password
    const newUser = new UserData({
      userId: req.body.userId,
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res.json({ status: "ok" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email address
      res.json({ status: "error", error: "Duplicate email address" });
    } else {
      res.json({ status: "error", error: "Signup failed" });
    }
  }
});

/*Used for logging in an existing user.*/
server.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserData.findOne({ email });

    if (!user) {
      return res.json({ status: "error", error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Generate a JWT token with user data
      const token = jwt.sign(
        { userId: user.userId },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.cookie("token", token, { httpOnly: true });

      //return res.json({ status: 'ok', token: token, user: true });
      return res.json({
        status: "ok",
        user: { userId: user.userId, token: token },
      });
    } else {
      return res.json({ status: "error", error: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ status: "error", error: "Login failed" });
  }
});

server.post("/verify-token", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Token is valid, send the user ID
    res.json({ userId });
  } catch (error) {
    // Token verification failed
    res.status(401).json({ error: "Invalid token" });
  }
});

server.get("/user/:user_id/tickets", authenticateToken, async (req, res) => {
  try {
    // Get the user ID from the request object
    const { user_id } = req.params;
    // Verify that the user ID matches the authenticated user, we are setting req.userId = payload.userId during authentication.
    if (user_id !== req.userId) {
      return res.sendStatus(403); // Forbidden if user ID doesn't match
    }

    // Fetch the user's tickets from the database and send the response
    const tickets = await Ticket.find({ id: user_id });
    res.json({ status: 200, tickets });
  } catch (error) {
    res.json({ status: "error", error: "Failed to fetch tickets" });
  }
});

server.get(
  "/user/:user_id/authenticate",
  authenticateToken,
  async (req, res) => {
    try {
      const { user_id } = req.params;

      if (user_id !== req.userId) {
        return res.json({ status: 403 });
      } else {
        return res.json({ status: 200 });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", error: "Failed to authenticate the user." });
    }
  }
);

server.post(
  "/user/:user_id/createticket",
  authenticateToken,
  async (req, res) => {
    try {
      const { user_id } = req.params;

      if (user_id !== req.userId) {
        return res.sendStatus(403); // Forbidden if user ID doesn't match
      }
      const {
        //req.params was not working for some reason, so using the user_id received from frontend
        name,
        email,
        phoneNumber,
        landlineNumber,
        issue,
        classification,
        channel,
        remarks,
        resolved,
        priority,
        assignedEngineer,
      } = req.body;

      // Create a new ticket document
      const ticket = new Ticket({
        id: user_id,
        name,
        email,
        phoneNumber,
        landlineNumber,
        issue,
        classification,
        channel,
        remarks,
        resolved,
        priority,
        assignedEngineer,
      });

      // Save the ticket to the database
      await ticket.save();

      res.json({ status: 200 });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", error: "Failed to create ticket" });
    }
  }
);

/* Used for exporting the user data basic (email and name) */
const exportData = async (req, res) => {
  try {
    let users = [];
    const userdata = await UserData.find({}); //retrieve all users
    userdata.forEach((user) => {
      users.push({
        email: user.email,
        name: user.name,
      });
    });
    //setting the filename for export
    const date = new Date();
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    const filename = ["Users-", formattedDate].join("");

    // defining the csv file fields
    const csvFields = ["Email", "Name"];

    //parsing the user data array
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(users);

    res.setHeader("Content-Type", "text/csv");
    res.set(
      "Content-Disposition",
      ["attachment; filename=", filename, ".csv"].join("")
    );

    //success in sending the csv file and direct download
    res.status(200).end(csvData);
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
};

server.get("/exportuserdata", exportData);
/* Used for exporting the user data basic (email and name) */

server.listen(8080, () => {
  console.log("Server Started");
});
