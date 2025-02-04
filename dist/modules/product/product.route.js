"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../users/user.constant");
const router = express_1.default.Router();
router.get('/', product_controller_1.ProductController.getAllProducts);
product_controller_1.ProductController.getAllProducts;
router.post('/add', sendImageToCloudinary_1.upload.single('image'), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductController.addProduct);
router.get('/:productId', product_controller_1.ProductController.getSingleProductById);
router.patch('/:productId', sendImageToCloudinary_1.upload.single('image'), product_controller_1.ProductController.updateProduct);
router.delete('/:productId', product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
