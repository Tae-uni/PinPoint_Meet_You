const collection = require("../mongodb");

const loginController = (collection) => async(req,res,next) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (check && check.password === req.body.password) {
            res.render("home");
        } else {
            res.send("Wrong information!");
        }

    } catch (err) {
        next(err);
    }
};

module.exports = loginController;