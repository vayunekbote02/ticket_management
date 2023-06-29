const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://vayunekbote02:hRILdeiMoK8Mf3PL@cluster0.qxy9x8k.mongodb.net/ts?retryWrites=true&w=majority')
.then(() => {
console.log('Connected to MongoDB');
})
.catch(err => console.log(err));


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled


const User = new mongoose.Schema({
    userId: {type: String, required:true, unique: true},
    email: {type: String, required:true, unique: true},
    name: {type: String, required:true},
    password: {type: String, required:true}
}, );

const ticketSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  landlineNumber: String,
  issue: String,
  classification: String,
  channel: String,
  remarks: String,
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
  priority: { type: String, default: 'low' },
  assignedEngineer: String
});

const UserData = mongoose.model('UserData', User);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = { UserData, Ticket };  