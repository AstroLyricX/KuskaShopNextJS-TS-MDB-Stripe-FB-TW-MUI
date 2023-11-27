import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrenUser } from "@/actions/getCurrenUser";

export async function PUT(request: Request) {
  const currenUser = await getCurrenUser();

  if (!currenUser || currenUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, deliveryStatus } = body;

  const order = await prisma.order.update({
    where: {
      id: id,
    },
    data: { deliveryStatus },
  });
  return NextResponse.json(order);
}
