/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from './product.interface';
import { ProductModel } from './product.model';

const addProductToDB = async (product: Product) => {
  const newProduct = await ProductModel.create(product);
  return newProduct;
};

const getAllProductsToDB = async (searchTerm: string | undefined) => {
  try {
    let query = {};
    if (searchTerm) {
      query = {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
          { type: { $regex: searchTerm, $options: 'i' } },
        ],
      };
    }

    const bicycles = await ProductModel.find(query);

    return bicycles;
  } catch (error) {
    throw new Error('Error fetching bicycles: ');
  }
};

const getSingleProductByIdFromDB = async (productId: string) => {
  const product = await ProductModel.findById(productId);
  return product;
};

const updateProductInDB = async (
  productId: string,
  updatedData: Partial<Product>
) => {
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
