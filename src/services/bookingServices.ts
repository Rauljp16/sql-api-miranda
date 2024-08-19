import BookingModel from '../models/bookingModel';
import { Ibooking } from '../types/global';
import mongoose from 'mongoose';


export const allBookings = async (): Promise<Ibooking[]> => {
    const allBookings = await BookingModel.find()
    return allBookings;
};

export const bookingById = async (id: string): Promise<Ibooking | undefined> => {
    const booking = await BookingModel.findById(id)
    if (!booking) {
        throw new Error("Cannont find bookings")
    }

    return booking
};

export const createBooking = (booking: Ibooking | Ibooking[]) => {
    const newBooking = new BookingModel(booking)
    newBooking.save()
    return newBooking
}

export const createBookings = async (bookings: Ibooking[]): Promise<Ibooking[]> => {
    const createdBookings = await BookingModel.insertMany(bookings);
    return createdBookings;
};

export const updateBooking = async (id: string, body: Partial<Ibooking>): Promise<Ibooking | null> => {
    const objectId = new mongoose.Types.ObjectId(id);


    const updatedBooking = await BookingModel.findOneAndUpdate({ _id: objectId }, body, { new: true });
    return updatedBooking;

};

export const deleteBooking = async (id: string): Promise<Ibooking | null> => {
    const objectId = new mongoose.Types.ObjectId(id);
    const delBooking = await BookingModel.findByIdAndDelete(objectId)
    return delBooking
}

