"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Export configuration variables
exports.config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI_ATLAS || 'mongodb://localhost:27017/bicycle-store',
    NODE_ENV: process.env.NODE_ENV,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
    CLOUDINARY_CLOUD_NAME: 'dg2mf6ipn',
    CLOUDINARY_API_KEY: '397185693443894',
    CLOUDINARY_API_SECRET: 'N4HKZglhptSHEYgAAeA_Vum0ETw',
    admin_password: process.env.ADMIN_PASSWORD,
    // jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    // jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_SECRET: '5d6c908214f5d873ea392055cc1875657061657a5abd349d7f8075dc9e8e6198',
    JWT_REFRESH_SECRE: 'a579f3787fbc762946b52f5f445cc7f4e95f76cf500ddb9bc99e6dd9304cd749',
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};
