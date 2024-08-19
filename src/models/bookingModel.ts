import { model, Schema } from "mongoose";
import { Ibooking } from "../types/global";


const bookingSchema = new Schema<Ibooking>({
    Name: { type: String, required: true },
    OrderDate: { type: String, required: true },
    CheckIn: { type: String, required: true },
    CheckOut: { type: String, required: true },
    SpecialRequest: { type: String, required: true },
    RoomType: { type: String, required: true },
    RoomNumber: { type: String, required: true },
    Status: { type: String, required: true },
});

const BookingModel = model<Ibooking>("Booking", bookingSchema)

export default BookingModel