const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const express = require('express');
var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    },(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("connected to database")
        }
    });   
    const studentScheme = new mongoose.Schema({
        first_name:{
            type:String,
            required:true
        },
        last_name:{
            type:String,
            required:true
        },
        email_id:{
            type:String,
            required:true
        },
        is_paid:{
            type:Boolean,
            default:false
        }    
    })
    const Student = mongoose.model("Student",studentScheme)
    if(process.env.NODE_ENV=="production"){
        app.use(express.static('client/build'))
    }
    
    app.post('/students',(req,res)=>{
        const studentData = new Student(req.body)
        studentData.save()
    .then(item => {
        res.json({msg:"item saved to database"});
    })
    .catch(err => {
            console.log(err)
        res.status(400).send("unable to save to database");
        });
})

app.get('/students',async (req,res)=>{
    // console.log("I got called")
    const {page,limit} = req.query
    const totalElement = await Student.countDocuments()
    // console.log(totalElement)
    const data = await Student.find({},null,{skip:parseInt(page-1)*limit,limit:limit})
    res.json([{totalElement:totalElement},...data])
})
app.put('/students',(req,res)=>{
    const {id} = req.body
    Student.findByIdAndUpdate(id,{is_paid:true},(err)=>{
        if(err){
            res.json({err:err})
        }
        else{
            res.json({msg:"Done"})
        }
    })
})



const port = process.env.PORT || 30001  
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})