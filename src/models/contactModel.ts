import { model, Schema } from "mongoose";
import { Icontact } from "../types/global";


const contactSchema = new Schema<Icontact>({
    date: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    asunto: { type: String, required: true },
    comment: { type: String, required: true },
});

const ContactModel = model<Icontact>("Contact", contactSchema)

export default ContactModel