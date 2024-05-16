const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginSignUpTest") // 27017/(name of db)
.then(()=> {
    console.log("mongodb connected")
})
.catch(()=> {
    console.log("failed to connect")
})
// --- Basic setting ---

const userSchema = new mongoose.Schema({
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

const GroupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true
    },
    maxParticipants: {
        type: Number,
        required: true,
        default: 0
    },
    currentParticipants: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        maxlength: 1000,
        required: true
    },
    pic: {
        type: String,
        maxlength: 255
    },
    // foreign key.. ref from LogInCollection.
    /*creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'LogInCollection'
    },*/
    isFull: {
        type: Boolean,
        default: false
    },
    placeName: {
        type: String,
        maxlength: 255
    }
});

const User = mongoose.model("User", userSchema);
const Group = mongoose.model("Group", GroupSchema);

module.exports = { User, Group }; // Don't forget!! If not, you can't use in index.js