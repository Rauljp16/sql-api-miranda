import { model, Schema } from "mongoose";
import { Iroom } from "../types/global";


const roomSchema = new Schema<Iroom>({
    Foto: { type: String, required: true },
    number: { type: String, required: true },
    BedType: { type: String, required: true },
    Facilities: Array,
    Rate: { type: Number, required: true },
    OfferPrice: { type: Number, required: true },
    Status: { type: String, required: true },
    RoomFloor: { type: String, required: true },
});

const RoomModel = model<Iroom>("Room", roomSchema)

export default RoomModel


