const express = require('express');
const authRouter = express.Router();

const authController = require("../controllers/auth.controller");

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/newSession', authController.newSession);
authRouter.post('/secureAuth', authController.secureAuth);

module.exports = authRouter;