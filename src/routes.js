const express = require("express")
const router = express.Router();
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const collection = require("./mongodb");

router.get("/", (req,res) => {
    res.render("login");
});

router.get("/signup", (req,res) => {
    res.render("signup");
});

router.post("/signup", signupController(collection));
router.post("/login", loginController(collection));

module.exports = router;