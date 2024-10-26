import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


const app = express();
dotenv.config();


app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

console.log("MongoDB URL:", MONGOURL);



mongoose.connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const userModel = mongoose.model("users", userSchema);


app.get("/getUsers", async (req, res) => {
  try {
    const userData = await userModel.find();
    console.log("Retrieved userData:", userData); // Debugging log
    res.json(userData);
  } catch (error) {

    console.error("Error retrieving user data:", error);
    res.status(500).json({ message: "Error retrieving user data" });
  }
});


app.post("/register", async (req,res) =>{
  const {name ,age }= req.body;
  try{
    const newUser = userModel({name,age});
    await newUser.save();
    res.status(201).json({message: "user regisatered successfully", user: newUser});


  }catch(error){
    console.log("Error registering user ", error);
    res.status(500).json({message:"error register user"});
  }
});



