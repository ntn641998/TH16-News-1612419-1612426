
const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const bodyParser = require("body-parser");
const expbs = require("express-handlebars");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser")
const { port, database } = require("../config/config");
const passport_local = require('passport');
const passport_facebook = require('passport');

const router = express.Router();

const helpers = require("../routes/helpers");
app.use(express.static(process.cwd() + "/public")); 
// const publicPath = path.join(__dirname, "../public");
app.engine("handlebars",expbs({
  defaultLayout:"main",
  helpers:helpers
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','handlebars');
// app.use(express.static(publicPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('abcdefg'));

require('../middleware/session')(app);
require('../middleware/passport_local')(app, passport_local);
require('../middleware/passport_facebook')(app, passport_facebook);


require("../routes/handlers")(router);
require("../routes/user.route")(router, passport_local, passport_facebook);
require("../routes/category.route")(router);
require("../routes/post.route")(router);

app.use("/", router);

mongoose.connect(
  database,
  { useNewUrlParser: true,
    // useCreateIndex: true,
    //useFindAndModify: false
  },
  err => {
      if (err) {
          console.log(err);
      } else {
          console.log("Connected to the database");
      }
  }
);
//mongoose.set('useCreateIndex', true)



// http.listen(port, () => {
//   console.log("Connect to server via port ", port);
// });  
 //------------------------------
// var fs = require('fs')
// var https = require('https')
// https.createServer({
//   key: fs.readFileSync('./config/server.key'),
//   cert: fs.readFileSync('./config/server.cert')
// }, app)
// .listen(port, () => {
//      console.log("Connect to server via port ", port);
// }); 

app.listen(port, () => {
  console.log("Connect to server via port ", port);
}); 