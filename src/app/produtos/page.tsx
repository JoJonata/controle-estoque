import prisma from '@/lib/prisma/prismaClient';
import React from 'react';

const getCampaing = async () =>
    prisma.product.findMany({
        orderBy: {
            name: 'asc',
        },
    });



const HomePage: React.FC = async () => {
    const data = await getCampaing();

    return (
        <div style={{ border: '1px solid black', padding: '16px' }}>
            <h1 style={{ textAlign: 'center' }}>Produtos</h1>
            {
                JSON.stringify(data)
            }
        </div>
    )
};

export default HomePage;