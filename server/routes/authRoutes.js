
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/register', authController.register);

// module.exports = router;


import express from "express";
import {
    register,
    login
} from "../controllers/authController.js";

const router = express.Router();
router.post('/register', register); 
router.post('/login', login);


export default router;
