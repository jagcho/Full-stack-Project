const express = require('express');
const bodyParser = express.json()
const mongoose = require("mongoose")
const route = require("./routes/route.js")
const app = express();

app.use(bodyParser)

mongoose.connect("mongodb+srv://Jagcho:71nEXJtXcYfVx8T6@cluster0.5bg4mzz.mongodb.net/project1", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )
app.use('/', route)

  app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000 ...');
  });












