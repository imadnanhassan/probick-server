import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { ProductSchema } from './product.validation';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const addProduct = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const file = req.file;
  if (!file) {
    return sendResponse(res, { statusCode: 400, success: false, message: 'No image file uploaded', data: null });
  }

  const cloudinaryResult = await sendImageToCloudinary(file.filename, file.path);
  const validatedData = ProductSchema.parse({
    ...req.body,
    imageUrl: cloudinaryResult.secure_url,
  });

  const product = await ProductService.addProductToDB(validatedData);
  sendResponse(res, { statusCode: 200, success: true, message: 'Product created successfully', data: product });
});

const getAllProducts = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { meta, products } = await ProductService.getAllProductsToDB(
      req.query
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Products retrieved successfully',
      meta,
      data: products,
    });
  }
);

const getSingleProductById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params;
    const product = await ProductService.getSingleProductByIdFromDB(productId);

    if (!product) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Bicycle not found with the given ID',
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Bicycle fetched successfully',
      data: product,
    });
  }
);

const updateProduct = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params;
    let updatedData = req.body;
    console.log(updatedData, 'updatedData');

    const file = req.file;

    if (file) {
      const cloudinaryResult = await sendImageToCloudinary(
        file.filename,
        file.path
      );
      updatedData = {
        ...updatedData,
        imageUrl: cloudinaryResult.secure_url,
      };
    }

    const validatedData = ProductSchema.partial().parse(updatedData);
    const updatedProduct = await ProductService.updateProductInDB(
      productId,
      validatedData
    );

    if (!updatedProduct) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Product not found',
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  }
);

const deleteProduct = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params;
    const deletedProduct = await ProductService.deleteProductFromDB(productId);

    if (!deletedProduct) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Product not found',
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Product deleted successfully',
      data: {},
    });
  }
);

export const ProductController = {
  addProduct,
  getAllProducts,
  getSingleProductById,
  updateProduct,
  deleteProduct,
};
