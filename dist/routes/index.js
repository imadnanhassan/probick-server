"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = require("../modules/product/product.route");
const order_route_1 = require("../modules/order/order.route");
const auuth_route_1 = require("../modules/auth/auuth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/products',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoutes,
    },
    {
        path: '/auth',
        route: auuth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
