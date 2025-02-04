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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const addProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, 'req.body');
    const file = req.file;
    if (!file) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'No image file uploaded',
            data: null,
        });
    }
    const cloudinaryResult = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(file.filename, file.path);
    const validatedData = product_validation_1.ProductSchema.parse(Object.assign(Object.assign({}, req.body), { imageUrl: cloudinaryResult.secure_url }));
    const product = yield product_service_1.ProductService.addProductToDB(validatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Product created successfully',
        data: product,
    });
}));
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, products } = yield product_service_1.ProductService.getAllProductsToDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Products retrieved successfully',
        meta,
        data: products,
    });
}));
const getSingleProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const product = yield product_service_1.ProductService.getSingleProductByIdFromDB(productId);
    if (!product) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: 'Bicycle not found with the given ID',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Bicycle fetched successfully',
        data: product,
    });
}));
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    let updatedData = req.body;
    console.log(req.body, 'req.body');
    console.log(productId, 'productId');
    console.log(updatedData, 'updatedData');
    const file = req.file;
    if (file) {
        const cloudinaryResult = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(file.filename, file.path);
        updatedData = Object.assign(Object.assign({}, updatedData), { imageUrl: cloudinaryResult.secure_url });
    }
    const validatedData = product_validation_1.ProductSchema.partial().parse(updatedData);
    const updatedProduct = yield product_service_1.ProductService.updateProductInDB(productId, validatedData);
    if (!updatedProduct) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: 'Product not found',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const deletedProduct = yield product_service_1.ProductService.deleteProductFromDB(productId);
    if (!deletedProduct) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: 'Product not found',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Product deleted successfully',
        data: {},
    });
}));
exports.ProductController = {
    addProduct,
    getAllProducts,
    getSingleProductById,
    updateProduct,
    deleteProduct,
};
