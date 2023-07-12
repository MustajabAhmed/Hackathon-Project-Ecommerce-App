'use client'
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import Link from 'next/link';
import { Image as IImage } from 'sanity'
import { urlForImage } from '@/lib/image';

const getAddToCartProduct = async () => {
    const res = await fetch('api/cart', {
        method: "GET",
    })
    // console.log(res.json());
    
    const result = await res.json();
    // console.log(result);
    return result
}

const cart =  async() => {
    const data = await getAddToCartProduct()
    // console.log(res);
    
    
    return (
        <div>
            {
                // data.map((item) => (
                //     <div>
                //         item
                //     </div>
                // ))
            }
        </div>
    )
}

export default cart