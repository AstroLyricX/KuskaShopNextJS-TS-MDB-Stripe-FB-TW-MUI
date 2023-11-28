import { getCurrenUser } from "@/actions/getCurrenUser";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currenUser = await getCurrenUser();

  if (!currenUser) {
    return NextResponse.error();
  }

  if (currenUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const product = await prisma?.product.delete({
    where: { id: params.id },
  });

  return NextResponse.json(product);
}
