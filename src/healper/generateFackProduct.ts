import { faker } from '@faker-js/faker';
import {prisma} from "@/lib/db";
const generateFakeProduct = () => {
  return {
    name: faker.commerce.product(),
    price:parseFloat(faker.commerce.price())

  };
};




export async  function generateFakeProducts(){
    for(let i = 0;i<100;i++){
        const product = generateFakeProduct()
        
        await prisma.product.create({
          data:{
            name:product.name,
            price:product.price
        }
        })
        
    }
} 
 


