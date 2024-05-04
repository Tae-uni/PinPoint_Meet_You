const collection = require("../mongodb");

const signupController = (collection) => async(req,res,next) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password
        };
        await collection.insertMany([data]);
        res.render("home");
    } catch (err) {
        next(err);
    }
};

module.exports = signupController;