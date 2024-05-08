const collection = require("../mongodb");

const loginController = (collection) => async(req, res, next) => {
    try {
        const user = await collection.findOne({ email: req.body.email });
        
        if (user && user.password === req.body.password) {
            res.render("home");
        } else {
            res.send("Wrong email or password!");
        }
    } catch (err) {
        next(err);
    }
};

module.exports = loginController;
