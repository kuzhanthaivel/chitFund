"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signUpController_1 = require("../controllers/auth/signUpController");
const loginController_1 = require("../controllers/auth/loginController");
// import { upload } from '../controllers/middlewares/upload';
const authRoutes = (0, express_1.default)();
authRoutes.post('/signup', signUpController_1.signUpController);
authRoutes.post('/login', loginController_1.loginController);
exports.default = authRoutes;
