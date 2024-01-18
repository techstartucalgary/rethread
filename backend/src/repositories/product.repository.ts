import { prisma } from "../index.js";
import { Prisma } from "@prisma/client";
import { ProductNotFoundError } from "../errors/product.error.js";
import {
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaGenericError,
} from "../errors/prisma.error.js";

class ProductRepository implements ProductProvider {
  getProducts = async (): Promise<PrismaProducts | Error> => {
    try {
      const products: PrismaProducts = await prisma.product.findMany();
      return products;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaGenericError();
      } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new PrismaClientUnknownRequestError();
      } else if (e instanceof Prisma.PrismaClientRustPanicError) {
        throw new PrismaClientRustPanicError();
      } else if (e instanceof Prisma.PrismaClientInitializationError) {
        throw new PrismaClientInitializationError();
      } else if (e instanceof Prisma.PrismaClientValidationError) {
        throw new PrismaClientValidationError();
      } else {
        throw new PrismaGenericError();
      }
    }
  };

  getProductById = async (id: string): Promise<PrismaProduct | Error> => {
    try {
      const product: PrismaProduct | null = await prisma.product.findUnique({
        where: { id: id },
      });
      if (product === null) {
        throw new ProductNotFoundError();
      }
      return product;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaGenericError();
      } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new PrismaClientUnknownRequestError();
      } else if (e instanceof Prisma.PrismaClientRustPanicError) {
        throw new PrismaClientRustPanicError();
      } else if (e instanceof Prisma.PrismaClientInitializationError) {
        throw new PrismaClientInitializationError();
      } else if (e instanceof Prisma.PrismaClientValidationError) {
        throw new PrismaClientValidationError();
      } else if (e instanceof ProductNotFoundError) {
        throw new ProductNotFoundError();
      } else {
        throw new PrismaGenericError();
      }
    }
  };

  createProduct = async (
    title: string,
    size: string,
    color: string,
    description: string,
    gender: string,
    category: string,
    price: number,
    imageUrl: string
  ): Promise<PrismaProduct | Error> => {
    try {
      const newProduct: PrismaProduct = await prisma.product.create({
        data: {
          title: title,
          size: size,
          color: color,
          description: description,
          gender: gender,
          category: category,
          price: price,
          imageUrl: imageUrl,
        },
      });
      return newProduct;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaGenericError();
      } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new PrismaClientUnknownRequestError();
      } else if (e instanceof Prisma.PrismaClientRustPanicError) {
        throw new PrismaClientRustPanicError();
      } else if (e instanceof Prisma.PrismaClientInitializationError) {
        throw new PrismaClientInitializationError();
      } else if (e instanceof Prisma.PrismaClientValidationError) {
        throw new PrismaClientValidationError();
      } else {
        throw new PrismaGenericError();
      }
    }
  };

  deleteProduct = async (id: string): Promise<PrismaProduct | Error> => {
    try {
      const product: PrismaProduct | null = await prisma.product.delete({
        where: { id: id },
      });
      if (product === null) {
        throw new ProductNotFoundError();
      }
      return product;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaGenericError();
      } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new PrismaClientUnknownRequestError();
      } else if (e instanceof Prisma.PrismaClientRustPanicError) {
        throw new PrismaClientRustPanicError();
      } else if (e instanceof Prisma.PrismaClientInitializationError) {
        throw new PrismaClientInitializationError();
      } else if (e instanceof Prisma.PrismaClientValidationError) {
        throw new PrismaClientValidationError();
      } else {
        throw new PrismaGenericError();
      }
    }
  };
}

export default ProductRepository;