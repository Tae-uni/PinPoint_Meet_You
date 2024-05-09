const { body, validationResult } = require('express-validator');

const userValRules = () => {
    return [
        body('username', 'Username must be 4-20 characters long and must not contain special characters')
            .isLength({ min: 4, max: 20 })
            .matches(/^[A-Za-z0-9_]+$/, 'i'), // only letters, numbers, and underscores
        body('email', 'Invalid email format').isEmail().normalizeEmail(),
        body('password', 'Password must be at least 8 characters long and include one lowercase letter, one uppercase letter, one number, and one special character.')
            .isLength({ min: 8 })
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .withMessage('Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.'),
        body('confirmPassword', 'Passwords do not match')
            .custom((value, {req}) => value === req.body.password),
        body('birthdate', 'Birthdate must be a valid date').isDate(),
        body('gender', 'Gender is required')
            .isIn(['Male', 'Female', 'Other'])
            .withMessage('Gender must be one of male, female, or other')
    ];
};

const validateSignup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    userValRules,
    validateSignup
};