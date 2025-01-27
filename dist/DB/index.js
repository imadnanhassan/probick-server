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
    id: '0001',
    email: 'adnanhassan@gmail.com',
    password: 'admin123456',
    needsPasswordChange: false,
    role: user_constant_1.USER_ROLE.admin,
    status: 'active',
    isDeleted: false,
};
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const isAdminExist = yield user_model_1.User.findOne({ role: user_constant_1.USER_ROLE.admin });
    if (!isAdminExist) {
        yield user_model_1.User.create(superUser);
    }
});
exports.default = seedAdmin;
