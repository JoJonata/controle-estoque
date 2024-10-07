import prisma from "@/lib/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        console.log(data)

        const res = await prisma.product.create({
            data: {
                name: data.product,
                count: data.count,
                description: data.description,
                category: {
                    connectOrCreate: {
                        where: {
                            name: data.category

                        },
                        create: {
                            name: data.category
                        }
                    }
                },
                brand: {
                    connectOrCreate: {
                        where: {
                            name: data.brand,
                        },
                        create: {
                            name: data.brand,
                        }
                    }
                }
            }
        })

        return NextResponse.json(res)

    } catch (error) {
        console.log(error);
        return NextResponse.error;
    }
}