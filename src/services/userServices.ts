import { Iuser } from '../types/global';
import UserModel from '../models/userModel';
import mongoose from 'mongoose';
var bcrypt = require('bcryptjs');

export const allUsers = async (): Promise<Iuser[]> => {
    const allUsers = await UserModel.find()
    return allUsers;
};

export const userById = async (id: string): Promise<Iuser | undefined> => {
    const user = await UserModel.findById(id)
    if (!user) {
        throw new Error("Cannont find users")
    }

    return user
};

export const createUser = async (user: Iuser) => {
    const hasPassword = await bcrypt.hash(user.password, 10)
    const newUser = new UserModel({ ...user, password: hasPassword })
    newUser.save()
    return newUser
}

export const createUsers = async (users: Iuser[]): Promise<Iuser[]> => {
    console.log(users[0].password);
    const hashedUsers = await Promise.all(users.map(async user => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
    }));
    const createdUsers = await UserModel.insertMany(hashedUsers);
    return createdUsers;
};

export const updateUser = async (id: string, body: Partial<Iuser>): Promise<Iuser | null> => {
    const objectId = new mongoose.Types.ObjectId(id);
    const updatedUser = await UserModel.findOneAndUpdate({ _id: objectId }, body, { new: true });
    return updatedUser;
};

export const deleteUser = async (id: string): Promise<Iuser | null> => {
    const objectId = new mongoose.Types.ObjectId(id);
    const delUser = await UserModel.findByIdAndDelete(objectId)
    return delUser
}