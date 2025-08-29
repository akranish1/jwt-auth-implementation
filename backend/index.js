const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");



const app = express();
app.use(express.json());
app.use(cors());

//database name is:jwtAuthDemo//Connection
mongoose.connect('mongodb://127.0.0.1:27017/jwtAuthDemo');

//schema creation
const userSchema= new mongoose.Schema({
    username: String,
  password: String
})

//collection name: Users //model creation
const User = mongoose.model("User", userSchema);

//secret key for token
const SECRET = "mysecretkey";


//routes are here
app.post('/signup',async(req , res)=>{
    const{username, password}=req.body;

    const existing =await User.findOne({username});
    if(existing) return res.status(401).json({msg:"User Already exist"});

    const hashedPass=await bcrypt.hash(password,10);
    const newUser = new User({ username, password: hashedPass });
    await newUser.save();
    res.json({msg:"Registered Successfully"});
})

app.post('/login',async(req,res)=>{
    const{username, password}=req.body;
    const user = await User.findOne({ username });

    if(!user) return res.status(400).json({msg:"User not Found"});

    const match=await bcrypt.compare(password,user.password);
    if(!match) return res.status(400).json({msg:"Password invalid"});

    //login credentials are alright than give a signed token
    const token=jwt.sign({userId:user._id, username: user.username},SECRET,{ expiresIn: "1h" });
    res.json({token});
})

app.get('/profile',async(req,res)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    //profile mae aane par verify krlo token ko
    jwt.verify(token,SECRET,(err,decoded)=>{
        if(err)return res.sendStatus(403);
        res.json({msg:`Welcome ${decoded.username}`,username:decoded.username});  
    })
})

app.listen(5000, () => console.log("Server running on port 5000"));