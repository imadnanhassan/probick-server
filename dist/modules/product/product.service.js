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
exports.ProductService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_model_1 = require("./product.model");
const addProductToDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield product_model_1.ProductModel.create(product);
    return newProduct;
});
const getAllProductsToDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.default(product_model_1.ProductModel.find(), query);
    // Apply filtering, search, sorting, pagination, and field selection
    queryBuilder
        .search(['name', 'description'])
        .filter()
        .sort()
        .paginate()
        .fields();
    // Fetch products
    const products = yield queryBuilder.modelQuery;
    // Fetch total count for pagination metadata
    const meta = yield queryBuilder.countTotal();
    return { meta, products };
});
const getSingleProductByIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.ProductModel.findById(productId);
    return product;
});
const updateProductInDB = (productId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(updatedData);
    const updatedProduct = yield product_model_1.ProductModel.findByIdAndUpdate(productId, updatedData, { new: true, runValidators: true });
    return updatedProduct;
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_model_1.ProductModel.findByIdAndDelete(productId);
    return deletedProduct;
});
exports.ProductService = {
    addProductToDB,
    getAllProductsToDB,
    getSingleProductByIdFromDB,
    updateProductInDB,
    deleteProductFromDB,
};
