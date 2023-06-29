//File for storing rough code and temporary data, make sure to delete later.

<Container maxWidth="md">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Create Ticket
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="tel"
                label="Phone Number"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="tel"
                label="Landline Number"
                fullWidth
                value={landline}
                onChange={(e) => setLandline(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Issue</InputLabel>
                <Select
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                >
                  <MenuItem value="Hardware">Hardware</MenuItem>
                  <MenuItem value="Software">Software</MenuItem>
                  <MenuItem value="Networking">Networking</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Classification</InputLabel>
                <Select
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                >
                  <MenuItem value="Question">Question</MenuItem>
                  <MenuItem value="Problem">Problem</MenuItem>
                  <MenuItem value="Feature">Feature</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Channel</InputLabel>
                <Select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                >
                  <MenuItem value="Phone">Phone</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="Web">Web</MenuItem>
                  <MenuItem value="Chat">Chat</MenuItem>
                  <MenuItem value="Forums">Forums</MenuItem>
                  <MenuItem value="Feedback Widget">Feedback Widget</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Remarks"
                fullWidth
                multiline
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>