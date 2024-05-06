const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginSignUpTest") // 27017/(name of db)
.then(()=> {
    console.log("mongodb connected")
})
.catch(()=> {
    console.log("failed to connect")
})
// --- Basic setting ---

const LogInSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = new mongoose.model("LogInCollection",LogInSchema)

module.exports = collection // Don't forget!! If not, you can't use in index.js