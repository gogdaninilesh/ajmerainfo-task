const Joi = require("joi");

exports.createUserValidation = (user) => {
    console.log(user, 'COming Here');
    const schema = Joi.object({
        name: Joi.string().required().label("Name is required"),
        email: Joi.string().required().email().label("Email is required"),
        role: Joi.string().required().label("Role should be admin or user"),
        mobile: Joi.number().min(10).required().label("Mobile is required"),
        password: Joi.string().min(6).regex(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]{3,30}$/).required().label("Password is required"),
    });
    return schema.validate(user);
};

exports.loginValidation = (user) => {
    const schema = Joi.object({
        email: Joi.string().required().email().label("Email is required"),
        password: Joi.string().min(6).regex(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]{3,30}$/).required().label("Password is required"),
    });
    return schema.validate(user);
}