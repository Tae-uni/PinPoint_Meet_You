const express = require("express");
const router = express.Router();
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const groupController = require("./controllers/groupController");
const { userValRules, validateSignup } = require("./validators/signupValidator"); //import the signupValidator

const upload = require("./middlewares/upload");

// User Authentication Routes
router.get("/login", (req,res) => res.render("login"));
router.post("/login", loginController);
router.get("/signup", (req,res) => res.render("signup"));
router.post("/signup", userValRules(), validateSignup, signupController); // Validator -> signupController

// Group Management Routes
router.get("/groups", groupController.listGroup);
router.get("/groups/:groupId", groupController.getGroupDetails);
router.post("/groups", upload.single('image'), groupController.createGroup);
router.put("/groups/:groupId", upload.single('image'), groupController.updateGroup);

router.put("/groups/:groupId/participants", groupController.joinGroup);
router.delete("/groups/:groupId/participants", groupController.leaveGroup);

router.get('/createGroup', (req,res) => res.render('createGroup'));
router.get('/groups/:groupId/edit', groupController.renderUpdateGroupPage);
router.delete('/groups/:groupId', groupController.deleteGroup);

module.exports = router;