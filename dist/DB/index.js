"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_constant_1 = require("../modules/users/user.constant");
const user_model_1 = require("../modules/users/user.model");
const superUser = {
    name: 'Adnan Hassan',
    email: 'adnanhassan@gmail.com',
    password: 'admin123456',
    needsPasswordChange: false,
    role: user_constant_1.USER_ROLE.admin,
    status: 'active',
};
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminExist = yield user_model_1.UserModel.findOne({ role: user_constant_1.USER_ROLE.admin });
    if (!isAdminExist) {
        yield user_model_1.UserModel.create(superUser);
    }
});
exports.default = seedAdmin;
// "scripts": {
//   "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
//   "build": "tsc",
//   "start": "node dist/server.js",
//   "lint": "eslint './src/**/*.{ts,tsx}' --fix",
//   "format": "prettier --write './src/**/*.{ts,tsx}'",
//   "lint:fix": "eslint . --ext .ts,.tsx --fix"
// },
