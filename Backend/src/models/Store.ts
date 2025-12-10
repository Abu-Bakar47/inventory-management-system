// // src/models/Payment.ts
// import mongoose, { Document, Schema } from 'mongoose';

// export interface IStore extends Document {
//   userId: mongoose.Types.ObjectId;
//   name: string;
//   address:string;
//   manager:string;
//   mobile: string;
//   photo: string;
//   status: 'pending' | 'verified';
// }

// const StoreSchema: Schema = new Schema(
//   {
//     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     name: { type: String, required: true },
//     address: { type: String, required: true },
//     manager: { type: String },
//     mobile: { type: String },
//     photo: { type: String },
//     status: { type: String, enum: ['pending', 'verified'], default: 'pending' },
//   },
//   { timestamps: true },
// );

// export default mongoose.model<IStore>('Store', StoreSchema);


import mongoose, { Document, Schema } from 'mongoose';

export interface IStore extends Document {
  owner: mongoose.Types.ObjectId;
  name: string;
  address: string;
  manager?: string;
  mobile?: string;
  photo?: string;
  status: 'pending' | 'verified';
  selected: boolean;
}

const StoreSchema: Schema = new Schema(
  {
    owner: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    name: { type: String, required: true },
    address: {
      city: String,
      pincode:String,
      state:String,
      area:String
     },
    manager: String,
    mobile: String,
    photo: String,
    status: { 
      type: String, 
      enum: ['pending', 'verified'], 
      default: 'pending' 
    },
    selected: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true },
);

export default mongoose.model<IStore>('Store', StoreSchema);