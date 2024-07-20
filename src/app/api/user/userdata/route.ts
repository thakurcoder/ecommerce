import { getDtataFromToken } from "@/healper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateFakeProducts } from "@/healper/generateFackProduct";

export async function GET(request: NextRequest) {
    try {
        // to generate and save product in database run one time
        // generateFakeProducts()
        const userId = await getDtataFromToken(request);
        // console.log("user id ", userId);

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        const products = await prisma.product.findMany({
            take: 100
        });

        const checkedValues = await prisma.userProduct.findMany({
            where: {
                userId: userId
            }
        });

        const checkedProductIds = checkedValues.map(value => value.productId);

        return NextResponse.json({
            message: "user found",
            data: user,
            products: products,
            checkedProductIds: checkedProductIds
        });
    } catch (error) {
        return NextResponse.json({
            message: error
        });
    }
}
