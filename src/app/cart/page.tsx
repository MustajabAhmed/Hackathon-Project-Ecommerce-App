'use client'
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Image as IImage } from 'sanity';
import { urlForImage } from '@/lib/image';
import { client } from '@/lib/client';
import Quantity from '@/components/Quantity';


const getProductData = async () => {
    const res = await client.fetch(`*[_type=="product"]{
      price, product_image, cloth_type -> {
        cloth_tyoey_name
      }, product_care, cloth_category -> {
        cloth_category_name
      }, title, product_details, _id
    }`)
    return res
}

interface IProduct {
    _id: string,
    title: string,
    price: number,
    cloth_type: IClothType
    product_details: string,
    cloth_category: IClothCategory,
    cloth_category_name: string,
    product_image: IImage[],
    product_care: string[],
}

interface IClothType {
    cloth_tyoey_name: string,
}

interface IClothCategory {
    cloth_category_name: string
}

const getAddToCartProduct = async () => {

    const res = await fetch('api/cart', {
        method: "GET",
    })
    const result = await res.json();
    return result
}

interface CartData {
    res: Array<{ id: number; user_id: string; product_id: string; quantity: number }>;
}

const cart = () => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [data, setData] = useState<CartData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const productsData: IProduct[] = await getProductData();
            setProducts(productsData);

            const data: CartData | null = await getAddToCartProduct();
            setData(data);
        };

        fetchData();
    }, []);

    const filteredProducts = useMemo(() => {
        if (!data) {
            return [];
        }

        return products.filter((product) =>
            data.res.some((item) => item.product_id === product._id)
        );
    }, [data, products]);

    const handleQuantityChange = (productId: string, quantity: number) => {
        if (data) {
            const updatedData = {
                res: data.res.map((item) => {
                    if (item.product_id === productId) {
                        const price = products.find((product) => product._id === productId)?.price || 0;
                        const totalPrice = price * quantity;
                        console.log(totalPrice);

                        return { ...item, quantity, totalPrice };
                    }
                    return item;
                }),
            };
            setData(updatedData);
        }
    };

    // console.log(products, data, filteredProducts);
    const [quantity, setQuantity] = useState<number>(0);

    return (
        <div>
            <h1 className='text-lg font-extrabold'>Shopping Cart</h1>
            {filteredProducts.length > 0 ? (
                <div className='flex justify-center'>
                    <div className='w-2/3'>
                        {filteredProducts.map((product) => {
                            const quantity = data?.res.find((item) => item.product_id === product._id)?.quantity || 0;
                            const price = product.price || 0;
                            const totalPrice = quantity * price;

                            return (
                                <div key={product._id} className='flex items-center space-x-4 my-4'>
                                    <div>
                                        <Image width={380} height={400} className='w-20 h-20 object-cover' src={urlForImage(product.product_image[0]).width(200).url()} alt={product.title} />
                                    </div>
                                    <div className='px-5'>
                                        <h2 className='text-lg font-bold'>{product.title}</h2>
                                        {/* <p>Price: ${product.price}</p> */}
                                        <p>{product.cloth_type.cloth_tyoey_name}</p>
                                        <p className='text-lg font-bold'>Delivery Estimation</p>
                                        <p className='text-yellow-300'>
                                            5 Working Days
                                        </p>
                                        {/* <p>Quantity: {data?.res.find((item) => item.product_id === product._id)?.quantity}</p> */}
                                        <div>
                                            <div>
                                                ${totalPrice}
                                            </div>
                                            <div className='float-right'>
                                                <Quantity
                                                    num={quantity}
                                                    setNum={(value: number) => {
                                                        setQuantity(value);
                                                        handleQuantityChange(product._id, value);
                                                    }}
                                                    onQuantityChange={(value: number) => {
                                                        setQuantity(value);
                                                        handleQuantityChange(product._id, value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/* <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Remove</button> */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='w-1/3'>
                        <h2 className='text-lg font-bold mb-4'>Order Summary</h2>
                        <div className='bg-gray-100 p-4 rounded'>
                            <p>Subtotal: $100</p>
                            <p>Shipping: $10</p>
                            <p className='text-xl font-bold mt-2'>Total: $110</p>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded'>Checkout</button>
                        </div>
                    </div>
                    {/* ... */}
                </div>
            ) : (
                <p>No products found in the cart</p>
            )}
        </div>
    );
};

export default cart;
