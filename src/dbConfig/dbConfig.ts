import mongoose from "mongoose";
export async function connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/')
    .then(() => console.log('Connected! TO mongo'));
  }
  
