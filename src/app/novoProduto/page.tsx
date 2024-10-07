import prisma from "@/lib/prisma/prismaClient";
import EstoqueProdutos from "./Propries";
import Loanding from "../loading";

const getCategory = async () =>
    prisma.category.findMany({
        orderBy: {
            name: 'asc',
        },
        select: {
            id: true,
            name: true,
        }
    });

const getBrand = async () =>
    prisma.brand.findMany({
        orderBy: {
            name: 'asc',
        },
        select: {
            id: true,
            name: true,
        }
    });

export default async function Page() {
    const data = await getCategory();
    const dataBrand = await getBrand();

    if (!data) {
        <Loanding />
    }

    return (
        <EstoqueProdutos data={data} dataBrand={dataBrand} />
    )
}