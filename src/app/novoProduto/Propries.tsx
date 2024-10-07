"use client";

import React, { useRef, useState } from 'react';
import { Button, Divider, Form, Input, InputNumber, Select, Space, Typography } from 'antd';
import {
    PlusOutlined,
} from '@ant-design/icons';
import type { InputRef } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { Brand, Category } from '@prisma/client';
import prisma from '@/lib/prisma/prismaClient';




const { Text } = Typography;

type FormProps = {
    product: string;
    count: number;
    category?: string;
    brand: string;
    description: string;
};

export function EstoqueProdutos({
    data,
    dataBrand
}: {
    data: Category[]
    dataBrand: Brand[]
}
) {
    const { control, handleSubmit, formState: {
        errors
    } } = useForm<FormProps>();

    const onSubmit = (values: FormProps) => {
        alert(JSON.stringify(values));
        fetch("http://localhost:3000/api/produto", {
            method: 'POST',
            body: JSON.stringify(values)
        })
    };

    console.log(data)


    const [items, setItems] = useState<{ name: string }[]>(data);
    const [marcas, setMarcas] = useState<{ name: string }[]>(dataBrand);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };


    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, {
            name: name
        }]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };


    const addMarca = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setMarcas([...marcas, {
            name: name
        }]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    console.log(items)

    return (
        <div style={{ border: '1px solid black', padding: '16px' }}>
            <h1 style={{ textAlign: 'center' }}>Novo Produto</h1>
            <Form
                layout="vertical"
                onFinish={handleSubmit(onSubmit)}
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Nome Produto" name="product" rules={[{ message: 'Por favor insira o nome do produto!' }]}>
                    <Controller
                        name="product"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder='Ex: Monitor' />
                        )}
                    />
                </Form.Item>

                <Form.Item label="Quantidade" name="count">
                    <Controller
                        name='count'
                        control={control}
                        render={({ field }) => (
                            <>
                                <InputNumber {...field} min={1} />
                            </>
                        )
                        } />
                </Form.Item>

                <Form.Item label="Marca" name="brand" >
                    <Controller
                        name="brand"
                        rules={{
                            required: {
                                message: 'Por favor escolha ou adicione uma marca!',
                                value: true
                            }
                        }}

                        control={control}
                        render={({ field }) => (
                            <>
                                <Select {...field} placeholder='Escolha ou adicione'
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Input
                                                    placeholder="Bote uma marca"
                                                    ref={inputRef}
                                                    value={name}
                                                    onChange={onNameChange}
                                                    onKeyDown={(e) => e.stopPropagation()}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addMarca}>
                                                    Add marca
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={marcas.map((marca) => ({ label: marca.name, value: marca.name }))}
                                />
                                {errors?.brand &&
                                    <Text type="danger">{errors.brand.message}</Text>
                                }
                            </>
                        )}
                    />
                </Form.Item>

                <Form.Item label="Descrição" name="description" >
                    <Controller
                        name="description"
                        rules={{
                            required: {
                                message: 'Invalido',
                                value: false
                            }
                        }}
                        control={control}
                        render={({ field }) => (
                            <>
                                <Input   {...field} placeholder='Adicione algo relevante sobre' />
                            </>
                        )}
                    />
                </Form.Item>


                <Form.Item label="Categoria" name="category">
                    <Controller
                        name="category"
                        rules={{
                            required: {
                                message: 'Por favor escolha ou adicione uma categoria!',
                                value: true
                            }
                        }}

                        control={control}
                        render={({ field }) => (
                            <>
                                <Select   {...field} placeholder='Escolha ou adicione'
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>

                                                <Input
                                                    placeholder="Bote uma categoria"
                                                    ref={inputRef}
                                                    value={name}
                                                    onChange={onNameChange}
                                                    onKeyDown={(e) => e.stopPropagation()}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                    Add Categoria
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={items.map((item) => ({ label: item.name, value: item.name }))}
                                />
                                {errors?.category &&
                                    <Text type="danger">{errors.category.message}</Text>

                                }
                            </>
                        )}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Salvar</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EstoqueProdutos;