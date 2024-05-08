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
        required:true,
        minlength: 4,
        maxlength: 20,
        match: /^[A-Za-z0-9_]+$/
    },
    email: {
        type:String,
        required:true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password:{
        type:String,
        required:true,
        minlength: 8,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male','Female','Other']
    }
});

const collection = new mongoose.model("LogInCollection",LogInSchema)

module.exports = collection // Don't forget!! If not, you can't use in index.js