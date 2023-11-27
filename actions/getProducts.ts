import prisma from "@/libs/prismadb";

// Define the parameters for the getProducts function
export interface getProductsParams {
  category?: string | null;
  searchTerm?: string | null;
}

// Define the default export function getProducts
export default async function getProducts(params: getProductsParams) {
  try {
    const { category, searchTerm } = params;

    let searchString = searchTerm;
    if (!searchTerm) {
      searchString = "";
    }

    // Initialize the query object with any provided category filter
    let query: any = {};
    if (category) {
      query.category = category;
    }

    // Use Prisma to fetch products from the database based on the provided filters
    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    // Return the fetched products
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
