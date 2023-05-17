import User from '../models/User.js';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";

// Create New User
export const createNewUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Check if user exists
  const userExists = await User.findOne(email)
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  } else {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        hashedPassword
    });

    if(newUser){
        res.status(201).json({
            name: newUser.name,
            email: newUser.email
        });
    }else{
        res.status(400)
        throw new Error('Invalid User Data');
    }


    try {
      await newUser.save()
      res.status(200).json(newUser)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }
})
