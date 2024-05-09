const { User } = require("../mongodb");

const signupController = async(req,res,next) => {
    try {
        const { username, email, password, birthdate, gender } = req.body;
        const newUser = {
            username,
            email,
            password,
            birthdate,
            gender
        };
        //await User.create(newUser);
        await User.insertMany([newUser]);
        res.render("home", { message: "Signup successful!" });
    } catch (err) {
        next(err);
    }
};

module.exports = signupController;