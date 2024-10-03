"use client";

import React from 'react';
import { Button, Form, Input, InputNumber, Select, Space, Typography } from 'antd';
import { useForm, Controller } from 'react-hook-form';

const { Text } = Typography;

type FormProps = {
    product: string;
    count: number;
    category: string;
    brand: string;
    description: string;
};

export function EstoqueProdutos() {
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

    //console.log(errors.description)

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
                                <InputNumber {...field} min={1}

                                />
                            </>
                        )
                        } />
                </Form.Item>

                <Form.Item label="Categoria" name="category">
                    <Controller
                        name="category"
                        rules={{
                            required: {
                                message: 'Por favor insira a categoria!',
                                value: true
                            }
                        }}
                        control={control}
                        render={({ field }) => (
                            <>
                                <Input status={errors?.category ? 'error' : ''
                                } {...field} placeholder='Ex: Hardware' />
                                {errors?.category &&
                                    <Text type='danger'>{errors.category.message}</Text>

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
                                value: true
                            }
                        }}

                        control={control}
                        render={({ field }) => (
                            <>
                                <Input   {...field} placeholder='Adicione algo relevante sobre' />
                                {errors?.description &&
                                    <Text type="danger">{errors.description.message}</Text>

                                }
                            </>
                        )}
                    />
                </Form.Item>


                <Form.Item label="Marca" name="Brand" >
                    <Controller
                        name="brand"
                        rules={{
                            required: {
                                message: 'Invalido',
                                value: true
                            }
                        }}

                        control={control}
                        render={({ field }) => (
                            <>
                                <Select   {...field} placeholder='Escolha a marca'
                                    dropdownRender={ }
                                />
                                {errors?.description &&
                                    <Text type="danger">{errors.description.message}</Text>

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