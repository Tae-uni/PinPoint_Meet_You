const collection = require("../mongodb");

const signupController = (collection) => async(req,res,next) => {
    try {
        const { username, email, password, birthdate, gender } = req.body;
        const newUser = {
            username,
            email,
            password,
            birthdate,
            gender
        };
        await collection.insertMany([newUser]);
        res.render("home", { message: "Signup successful!" });
    } catch (err) {
        next(err);
    }
};

module.exports = signupController;