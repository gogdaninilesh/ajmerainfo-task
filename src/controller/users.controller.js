const Users = require("../model/users");
const _ = require("underscore");
const { createUserValidation, loginValidation } = require("../middleware/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../../config/index");

class UsersController {

    static async create(req, res) {
        try {
            const { body, file } = req;
            const { error } = createUserValidation(body);
            if (error) {
                return res.status(200).send({ status: false, message: error.details[0].message });
            }
            const validateEmail = await Users.findOne({ where: { email: body.email } });
            if (_.isEmpty(validateEmail)) {
                await bcrypt.hash(body.password, 10).then(async (hash) => {
                    const payload = {
                        name: body.name,
                        email: body.email,
                        mobile: body.mobile,
                        role: body && body.role === 'admin' ? 1 : 2, // 1 Admin, 2 User
                        profile: file?.path || "",
                        password: hash,
                        status: 1,
                        createdAt: new Date()
                    }
                    const addUser = await Users.create(payload);

                    if (addUser) {
                        const token = jwt.sign(
                            {
                                id: addUser.id,
                                name: addUser.name,
                                email: addUser.email,
                                role: addUser.role === 1 ? "admin" : "user",
                            },
                            config.JWT_SECRET_KEY,
                            { expiresIn: config.JWT_EXPIRES }

                        );
                        const responseData = {
                            id: addUser.id,
                            name: addUser.name,
                            email: addUser.email,
                            profile: `${config.IMG_URl}/${addUser.profile}`,
                            role: addUser.role,
                        }
                        return res.status(200).send({ status: true, message: `Welcome ${addUser.email}`, data: { ...responseData, token } });
                    } else {
                        return res.status(200).send({ status: false, message: "Failed to add admin" });
                    }
                });
            } else {
                return res.status(200).send({ status: false, message: "Email already exists." });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send({ status: false, message: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { body } = req;
            const { error } = loginValidation(body);
            if (error) {
                return res.status(200).send({ status: false, message: error.details[0].message });
            }
            const validateUser = await Users.findOne({ where: { email: body.email } });
            if (!_.isEmpty(validateUser)) {
                const checkPassword = await bcrypt.compare(body.password, validateUser.password);
                if (checkPassword) {
                    const token = jwt.sign(
                        {
                            id: validateUser.id,
                            name: validateUser.name,
                            email: validateUser.email,
                            role: validateUser.role,
                        },
                        config.JWT_SECRET_KEY,
                        { expiresIn: config.JWT_EXPIRES }

                    );
                    const responseData = {
                        id: validateUser.id,
                        name: validateUser.name,
                        email: validateUser.email,
                        profile: `${config.IMG_URl}/${validateUser.profile}`,
                        role: validateUser.role === 1 ? "admin" : "user",
                    }
                    return res.status(200).send({ status: true, message: `Welcome back ${validateUser.email}`, data: { ...responseData, token } });
                } else {
                    return res.status(200).send({ status: false, message: "Invalid password" });
                }
            } else {
                return res.status(200).send({ status: false, message: "Email not found" });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({ status: false, message: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const users = await Users.findAll({
                raw: true,
                attributes: ["id", "name", "email", "mobile", "role", "profile", "status", "createdAt"],
                where: { status: 1 }
            });
            if (!_.isEmpty(users)) {
                users.map(user => {
                    user.profile = user.profile ? `${config.IMG_URl}/${user.profile}` : "";
                    user.role = user.role === 1 ? "admin" : "user";
                });
                return res.status(200).send({ status: true, message: "Users list", data: users });
            } else {
                return res.status(200).send({ status: false, message: "No user found" });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send({ status: false, message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { body, file, params } = req;
            const validateEmail = await Users.findOne({
                raw: true,
                where: { id: params.id }
            });
            if (!_.isEmpty(validateEmail)) {
                const payload = {
                    name: body && body.name ? body.name : validateEmail.name,
                    email: body && body.email ? body.email : validateEmail.email,
                    mobile: body && body.mobile ? body.mobile : validateEmail.mobile,
                    profile: file && file.path ? file.path : validateEmail.profile,
                    updatedAt: new Date()
                }
                const updateUser = await Users.update(payload, { where: { id: params.id } });
                if (updateUser) {
                    return res.status(200).send({ status: true, message: "User updated successfully" });
                } else {
                    return res.status(200).send({ status: false, message: "Failed to update user" });
                }
            } else {
                return res.status(200).send({ status: false, message: "Email already exists." });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send({ status: false, message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { params } = req;
            const validateUser = await Users.findOne({
                raw: true,
                where: { id: params.id }
            });
            if (!_.isEmpty(validateUser)) {
                const deleteUser = await Users.update({ status: 2 }, { where: { id: params.id } });
                if (deleteUser) {
                    return res.status(200).send({ status: true, message: "User deleted successfully" });
                } else {
                    return res.status(200).send({ status: false, message: "Failed to delete user" });
                }
            } else {
                return res.status(200).send({ status: false, message: "User not found" });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({ status: false, message: error.message });
        }
    }

}

module.exports = UsersController;