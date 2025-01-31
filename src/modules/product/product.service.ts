/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { Product } from './product.interface';
import { ProductModel } from './product.model';

const addProductToDB = async (product: Product) => {
  const newProduct = await ProductModel.create(product);
  return newProduct;
};

const getAllProductsToDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(ProductModel.find(), query);

  // Apply filtering, search, sorting, pagination, and field selection
  queryBuilder
    .search(['name', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields();

  // Fetch products
  const products = await queryBuilder.modelQuery;

  // Fetch total count for pagination metadata
  const meta = await queryBuilder.countTotal();

  return { meta, products };
};

const getSingleProductByIdFromDB = async (productId: string) => {
  const product = await ProductModel.findById(productId);
  return product;
};

const updateProductInDB = async (
  productId: string,
  updatedData: Partial<Product>
) => {
  console.log(updatedData);
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    updatedData,
    { new: true, runValidators: true }
  );
  return updatedProduct;
};

const deleteProductFromDB = async (productId: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(productId);
  return deletedProduct;
};

export const ProductService = {
  addProductToDB,
  getAllProductsToDB,
  getSingleProductByIdFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
