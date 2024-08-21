export interface DataBookings {
  Name: string;
  id: string;
  OrderDate: string;
  CheckIn: string;
  CheckOut: string;
  SpecialRequest: string;
  RoomType: string;
  RoomNumber: string;
  Status: string;
}
export interface DataComments {
  comment: string;
  photo: string;
  name: string;
  timeAgo: string;
}
export interface DataContacts {
  date: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  asunto: string;
  comment: string;
}
export interface DataRooms {
  Foto: string;
  number: string;
  id: string;
  BedType: string;
  Facilities: string[];
  Rate: number;
  OfferPrice: number;
  Status: string;
  RoomFloor: string;
}
export interface DataUsers {
  foto: string;
  name: string;
  id: string;
  startDate: string;
  description: string;
  email: string;
  contact: string;
  status: string;
}

export interface Iuser {
  foto: string;
  name: string;
  startDate: string;
  description: string;
  email: string;
  contact: string;
  status: string;
  password: string;
}

export interface Ibooking {
  Name: string;
  OrderDate: string;
  CheckIn: string;
  CheckOut: string;
  SpecialRequest: string;
  RoomType: string;
  RoomNumber: string;
  Status: string;
}
export interface Icontact {
  date: string;
  name: string;
  email: string;
  phone: string;
  asunto: string;
  comment: string;
}
export interface Iroom {
  _id?: string;
  Foto: string;
  number: string;
  BedType: string;
  Facilities: any;
  Rate: number;
  OfferPrice: number;
  Status: string;
  RoomFloor: string;
}