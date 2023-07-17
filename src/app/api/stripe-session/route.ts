import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || ""

const stripe = new Stripe(key, {
    apiVersion: '2022-11-15',
})

export async function POST(req: NextRequest) {
    const body = await req.json()
    // console.log(body);
    try {
        if (body.filteredProducts.length > 0) {
            const session = await stripe.checkout.sessions.create({
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1NUTTEEdPLB4Gdui9cN5lJLr' },
                    { shipping_rate: 'shr_1NUTSPEdPLB4GduiunBW6kaM' }
                ],
                line_items: body.filteredProducts.map((item: any) => {
                    return {
                        price_data: {
                            currency: 'pkr',
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: item.quantity,
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                            maximum: 10,
                        },
                    }
                }),
                success_url: `${req.headers.get('origin')}/cart`,
                cancel_url: `${req.headers.get('origin')}/?canceled=true`,
            });
            return NextResponse.json({ session })
        } else {
            return NextResponse.json({ message: 'No data found' })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'something went wrong' })
    }
}
