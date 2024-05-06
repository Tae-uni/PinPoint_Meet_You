const express = require("express")
const router = express.Router();
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const { userValRules, validateSignup } = require("./validators/signupValidator"); //import the signupValidator
const collection = require("./mongodb");

router.get("/", (req,res) => {
    res.render("login");
});

router.get("/signup", (req,res) => {
    res.render("signup");
});

router.post("/signup", userValRules(), validateSignup, signupController(collection)); // Validator -> signupController
router.post("/login", loginController(collection));

module.exports = router;