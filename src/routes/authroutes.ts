import express, { Request, Response } from "express";
const IP = require('ip');
const bcrypt = require("bcrypt");
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');

const authroute = express.Router();

authroute.post("/signup", async (req, res) => {
    try {
      const { id,studentid, email, password,token } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "User with same email already exists!" });
      }
      const hashedPassword = await bcrypt.hash(password, 8);
  
      let user = new User({
        email,
        password: hashedPassword,
        studentid,
      });
      user = await user.save();
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

authroute.post("/signin", async (req, res) => {
    try {
        const {email,password}= req.body;
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({msg:"User with this email does not exist!"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(400).json({msg:"Incorrect password"});
        }

        const token = jwt.sign({id:user._id},"passwordKey");
        res.json({token, ...user._doc});
    } catch (error) {
        res.status(500).json({error:error});
    }
})
  
authroute.get('/testip', (req, res) => {
    const ipAddress = IP.address();
    res.send(ipAddress)
})

export default authroute;
export { authroute };
