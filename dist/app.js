"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middleware/errorHandler");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express_1.default.json());
// Simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// application products routes
app.use('/api/v1', routes_1.default);
// Global Error Handler
app.use(errorHandler_1.errorHandler);
// Not Found
// app.use(notFound)
exports.default = app;
