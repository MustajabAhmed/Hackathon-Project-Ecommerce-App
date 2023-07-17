'use client'
import { Image as IImage } from'sanity';
import getStripePromise from "@/lib/stripe"


interface IProduct {
    _id: string;
    title: string;
    price: number;
    cloth_type: IClothType;
    product_details: string;
    cloth_category: IClothCategory;
    cloth_category_name: string;
    product_image: IImage[];
    product_care: string[];
}

interface IClothType {
    cloth_tyoey_name: string;
}

interface IClothCategory {
    cloth_category_name: string;
}

interface CheckoutProps {
    filteredProducts: IProduct[];
  }

const Checkout = async ({ filteredProducts }: CheckoutProps) => {

    const stripe = await getStripePromise()

    const handleCheckout = async () => {

        const response = await fetch('/api/stripe-session/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
            body: JSON.stringify({
                filteredProducts
            }),
        })

        const data = await response.json()

        if (data.session) {
            stripe?.redirectToCheckout({ sessionId: data.session.id })
        }

    }

  return (
    <div>
        <button onClick={handleCheckout} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded'>Checkout</button>
    </div>
  )
}

export default Checkout