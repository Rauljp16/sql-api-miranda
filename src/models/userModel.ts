import { model, Schema } from "mongoose";
import { Iuser } from "../types/global";


const userSchema = new Schema<Iuser>({
    foto: { type: String, required: true },
    name: { type: String, required: true },
    startDate: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, required: true },
    password: { type: String, required: true },
});

const UserModel = model<Iuser>("User", userSchema)

export default UserModel


