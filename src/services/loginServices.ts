const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import UserModel from '../models/userModel';
var bcrypt = require('bcryptjs');

dotenv.config();

export const generateAccessToken = async (username: string, password: string) => {
    const user = await UserModel.findOne({ email: username })
    if (!user) {
        throw new Error('User not found');
    }
    const match = await bcrypt.compare(password, user.password)
    if (match) {
        return jwt.sign(user.email, process.env.TOKEN_SECRET)
    } else {

        throw new Error();
    }

}

