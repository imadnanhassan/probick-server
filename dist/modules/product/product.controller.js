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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const apiResponse_1 = require("../../utils/apiResponse");
const product_validation_1 = require("./product.validation");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = product_validation_1.ProductSchema.parse(req.body);
        const product = yield product_service_1.ProductService.addProductToDB(validatedData);
        res
            .status(200)
            .json(apiResponse_1.apiResponse.success(product, 'Bicycle created successfully'));
    }
    catch (error) {
        res.status(400).json(apiResponse_1.apiResponse.error(error, 'Invalid product data'));
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const products = yield product_service_1.ProductService.getAllProductsToDB(searchTerm);
        res
            .status(200)
            .json(apiResponse_1.apiResponse.success(products, 'Bicycles retrieved successfully'));
    }
    catch (error) {
        res.status(500).json(apiResponse_1.apiResponse.error(error, 'Failed to fetch products'));
    }
});
const getSingleProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield product_service_1.ProductService.getSingleProductByIdFromDB(productId);
        if (!product) {
            res
                .status(404)
                .json(apiResponse_1.apiResponse.error(null, 'Bicycle not found with the given ID'));
            return;
        }
        res
            .status(200)
            .json(apiResponse_1.apiResponse.success(product, 'Bicycle fetched successfully'));
    }
    catch (error) {
        res
            .status(500)
            .json(apiResponse_1.apiResponse.error(error, 'Error fetching bicycle by ID'));
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedData = req.body;
        const updatedProduct = yield product_service_1.ProductService.updateProductInDB(productId, updatedData);
        if (!updatedProduct) {
            res.status(404).json(apiResponse_1.apiResponse.error(null, 'Bicycle not found'));
            return;
        }
        res
            .status(200)
            .json(apiResponse_1.apiResponse.success(updatedProduct, 'Bicycle updated successfully'));
    }
    catch (error) {
        res.status(400).json(apiResponse_1.apiResponse.error(error, 'Error updating bicycle'));
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const deletedProduct = yield product_service_1.ProductService.deleteProductFromDB(productId);
        if (!deletedProduct) {
            res.status(404).json(apiResponse_1.apiResponse.error(null, 'Bicycle not found'));
            return;
        }
        res
            .status(200)
            .json(apiResponse_1.apiResponse.success({}, 'Bicycle deleted successfully'));
    }
    catch (error) {
        res.status(500).json(apiResponse_1.apiResponse.error(error, 'Error deleting bicycle'));
    }
});
exports.ProductController = {
    addProduct,
    getAllProducts,
    getSingleProductById,
    updateProduct,
    deleteProduct,
};
