import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { apiResponse } from '../../utils/apiResponse';
import { ProductSchema } from './product.validation';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const addProduct = async (req: Request, res: Response) => {
  try {
    
    const file = req.file; 
    if (!file) {
      return res
        .status(400)
        .json(apiResponse.error(null, 'No image file uploaded'));
    }

    const cloudinaryResult = await sendImageToCloudinary(
      file.filename,
      file.path
    );

    // Add the image URL to the product data
    const validatedData = ProductSchema.parse({
      ...req.body,
      imageUrl: cloudinaryResult.secure_url, 
    });

    // Save the product to the database
    const product = await ProductService.addProductToDB(validatedData);
    res
      .status(200)
      .json(apiResponse.success(product, 'Product created successfully'));
  } catch (error) {
    res.status(400).json(apiResponse.error(error, 'Invalid product data'));
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { searchTerm } = req.query;
    const products = await ProductService.getAllProductsToDB(
      searchTerm as string | undefined
    );
    res
      .status(200)
      .json(apiResponse.success(products, 'Bicycles retrieved successfully'));
  } catch (error) {
    res.status(500).json(apiResponse.error(error, 'Failed to fetch products'));
  }
};

const getSingleProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;

    const product = await ProductService.getSingleProductByIdFromDB(productId);

    if (!product) {
      res
        .status(404)
        .json(apiResponse.error(null, 'Bicycle not found with the given ID'));
      return;
    }

    res
      .status(200)
      .json(apiResponse.success(product, 'Bicycle fetched successfully'));
  } catch (error) {
    res
      .status(500)
      .json(apiResponse.error(error, 'Error fetching bicycle by ID'));
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;

    const updatedProduct = await ProductService.updateProductInDB(
      productId,
      updatedData
    );

    if (!updatedProduct) {
      res.status(404).json(apiResponse.error(null, 'Bicycle not found'));
      return;
    }

    res
      .status(200)
      .json(
        apiResponse.success(updatedProduct, 'Bicycle updated successfully')
      );
  } catch (error) {
    res.status(400).json(apiResponse.error(error, 'Error updating bicycle'));
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    const deletedProduct = await ProductService.deleteProductFromDB(productId);

    if (!deletedProduct) {
      res.status(404).json(apiResponse.error(null, 'Bicycle not found'));
      return;
    }

    res
      .status(200)
      .json(apiResponse.success({}, 'Bicycle deleted successfully'));
  } catch (error) {
    res.status(500).json(apiResponse.error(error, 'Error deleting bicycle'));
  }
};

export const ProductController = {
  addProduct,
  getAllProducts,
  getSingleProductById,
  updateProduct,
  deleteProduct,
};
