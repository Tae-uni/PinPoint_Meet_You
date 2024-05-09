const express = require("express")
const router = express.Router();
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const groupController = require("./controllers/groupController");
const { userValRules, validateSignup } = require("./validators/signupValidator"); //import the signupValidator
const User = require("./mongodb");

// User Authentication Routes
router.get("/login", (req,res) => res.render("login"));
router.post("/login", loginController);
router.get("/signup", (req,res) => res.render("signup"));
router.post("/signup", userValRules(), validateSignup, signupController); // Validator -> signupController

// Group Management Routes
router.post("groups", groupController.createGroup);
router.get("/groups", groupController.listGroup);
router.get("/groups/:groupId", groupController.getGroupDetails);
router.put("/groups/:groupId/participants", groupController.joinGroup);
router.delete("/groups/:groupId/participants", groupController.leaveGroup);

module.exports = router;