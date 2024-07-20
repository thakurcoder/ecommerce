// pages/api/user/updateUserProduct.ts

import { prisma } from '@/lib/db'; // Adjust the import according to your project structure
import { NextRequest, NextResponse } from 'next/server';

export async function POST( req:NextRequest, ) {
      const body = await req.json();
      const { userId, productId, value } = body;

    try {
      if (value) {
        // Add the user-product relation
        await prisma.userProduct.create({
          data: {
            userId: userId,
            productId: productId,
          },
        });
      } else {
        // Remove the user-product relation
        await prisma.userProduct.deleteMany({
          where: {
            userId: userId,
            productId: productId,
          },
        });
      }

      return NextResponse.json({ message: 'User product relation updated' ,
        status:200
      });
    } catch (error) {
      return NextResponse.json({ message: 'An error occurred while updating the user product relation' ,
        status:500
      });
    }
  
}
