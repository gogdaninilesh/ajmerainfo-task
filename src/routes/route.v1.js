const router = require('express').Router();
const multer = require("multer");
const path = require("path");
const SUPPORTED_FILE_TYPES = [".png", ".jpg", ".jpeg", ".JPEG", ".PNG", ".JPG"];
const { authGuard } = require("../middleware/auth");

const UsersController = require("../controller/users.controller");

const profilePic = multer.diskStorage({
    destination: "uploads/userprofile",
    filename: (req, file, callback) => {
        callback(
            null,
            Date.now() + path.extname(file.originalname)
        );
    },
});
const userProfile = multer({
    storage: profilePic,
    fileFilter: function (req, file, callback) {
        const fileExt = path.extname(file.originalname);
        if (SUPPORTED_FILE_TYPES.indexOf(fileExt) > -1) {
        } else {
            callback(null, false);
        }
        callback(null, true);
    },
});

/**
 * @swagger
 * /api/v1/user:
 *  post:
 *    summary: Create a new user
 *    description: Create a new user
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              mobile:
 *                type: string
 *              role:
 *                type: string
 *              profile:
 *                type: string
 *                format: binary
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: User created successfully
 */
router.post("/user", userProfile.single('profile'), UsersController.create);

/**
 * @swagger
 * /api/v1/user:
 *  get:
 *    summary: Get all users
 *    description: Get all users
 *    parameters:
 *      - in: header
 *        name: x-auth-token
 *        required: true
 *        description: The token used for authentication
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: User fetched successfully
 */

router.get("/user", authGuard, UsersController.getAll);

/**
 * @swagger
 * /api/v1/user/{id}:
 *  put:
 *    summary: Update user by id
 *    description: Update user by id
 *    parameters:
 *      - in: header
 *        name: x-auth-token
 *        required: true
 *        description: The token used for authentication
 *        schema:
 *          type: string
 *      - in: path
 *        name: id
 *        required: true
 *        description: User id
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              mobile:
 *                type: string
 *              profile:
 *                type: string
 *                format: binary
 *    responses:
 *      200:
 *        description: User updated successfully
 */

router.put("/user/:id", authGuard, userProfile.single('profile'), UsersController.update);

/**
 * @swagger
 * /api/v1/login:
 *  post:
 *    summary: Login user
 *    description: Login user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: User login successfully
 */

router.post("/login", UsersController.login);

/**
 * @swagger
 * /api/v1/user/{id}:
 *  delete:
 *    summary: Delete user by id
 *    description: Delete user by id
 *    parameters:
 *      - in: header
 *        name: x-auth-token
 *        required: true
 *        description: The token used for authentication
 *        schema:
 *          type: string
 *      - in: path
 *        name: id
 *        required: true
 *        description: User id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: User deleted successfully
 */

router.delete("/user/:id", authGuard, UsersController.delete);

router.all("*", (req, res) => {
    return res.status(400).send({ status: false, message: "Invalid URL" });
});

module.exports = router;