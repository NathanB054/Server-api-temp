import express, { Request, Response } from "express";
const IP = require('ip');
const authController = require("../controllers/authController");

const authroute = express.Router();
// ! call controller of auth
authroute.post('/register',authController.register);
authroute.get('/testip', (req, res) => {
    const ipAddress = IP.address();
    res.send(ipAddress)
})

export default authroute;
export { authroute };
