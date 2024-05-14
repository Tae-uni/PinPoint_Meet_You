const express = require("express"); // import Express.js module
const app = express(); // creates an instance of the Express app.
const path = require("path"); // import path module.
const hbs = require("hbs"); // import Handelbars template engine. use of templates for rendering views.
const User = require("./mongodb");
const router = require("./routes");
const methodOverride = require("method-override");

const templatePath = path.join(__dirname, '../templates');

// Middleware settings
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.set("view engine", "hbs"); // ejs
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false })); // mongoDB
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(methodOverride('_method'));

const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
})

app.use(router);

// it must be same with login.hbs form action's value.
app.listen(3000, () => {
    console.log("3000 port connected");
})
