import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrenUser } from "@/actions/getCurrenUser";

export async function POST(request: Request) {
  const currenUser = await getCurrenUser();

  if (!currenUser) {
    return NextResponse.error();
  }

  if (currenUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, description, price, brand, category, inStock, images } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      brand,
      category,
      inStock,
      images,
      price: parseFloat(price),
    },
  });

  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const currenUser = await getCurrenUser();

  if (!currenUser || currenUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, inStock } = body;

  const product = await prisma.product.update({
    where: { id: id },
    data: { inStock: inStock },
  });
  return NextResponse.json(product);
}
