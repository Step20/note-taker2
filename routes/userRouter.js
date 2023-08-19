const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const passport = require("passport");
const CLIENT_URL = "http://localhost:3000/";

// Register User
router.post("/register", userCtrl.registerUser);

// Login User
router.post("/login", userCtrl.loginUser);

// verify Token
router.get("/verify", userCtrl.verifiedToken);

router.get("/", userCtrl.getUser);

module.exports = router;
