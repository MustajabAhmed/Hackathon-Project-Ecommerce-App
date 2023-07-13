'use client'
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Image as IImage } from 'sanity';
import { urlForImage } from '@/lib/image';
import { client } from '@/lib/client';

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
    cloth_type_name: string,
    product_details: string,
    cloth_category: IClothCategory,
    cloth_category_name: string,
    product_image: IImage[],
    product_care: string[],
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

// const cart = async () => {

//     const products: IProduct[] = await getProductData()

//     const [data, setData] = useState<CartData | null>(null);


//     useEffect(() => {
//         const fetchData = async () => {
//             const result = await getAddToCartProduct();
//             setData(result);
//         };

//         fetchData();
//     }, []);

//     return (
//         <div>
//             {data ? (
//                 <div>
//                     {data.res.map((item) => (
//                         <div key={item.id}>
//                             <p>User ID: {item.user_id}</p>
//                             <p>Product ID: {item.product_id}</p>
//                             <p>Quantity: {item.quantity}</p>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };


// export default cart


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

    console.log(products, data, filteredProducts);
    

    return (
        <div>
            {filteredProducts.length > 0 ? (
                <div>
                    {filteredProducts.map((product) => (
                        <div key={product._id}>
                            <p>User ID: {product.title}</p>
                            <p>Product ID: {product._id}</p>
                            <p>Quantity: {data?.res.find((item) => item.product_id === product._id)?.quantity}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found in the cart</p>
            )}
        </div>
    );
};

export default cart;
