"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post('/add', (0, auth_1.default)('admin', 'user'), 
//   validateRequest(createOrderSchema),
order_controller_1.OrderController.createOrder);
router.put('/:orderId', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(order_validation_1.updateOrderStatusSchema), order_controller_1.OrderController.updateOrder);
router.get('/', (0, auth_1.default)('admin'), order_controller_1.OrderController.getOrders);
router.get('/:orderId', (0, auth_1.default)('user', 'admin'), order_controller_1.OrderController.getOrderById);
router.get('/revenue', order_controller_1.OrderController.getTotalRevenue);
exports.OrderRoutes = router;
