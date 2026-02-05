import mongoose from "mongoose";

export const  connectDB = async () =>{

   await mongoose.connect('mongodb+srv://ankitk11964:ankitk12345@cluster0.mwciv2y.mongodb.net/food-del').then(()=>console.log("DB Connected"));
   
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.