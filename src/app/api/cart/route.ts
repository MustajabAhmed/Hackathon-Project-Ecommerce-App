import { cartTable, db  } from "@/lib/drizzle"
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuid } from "uuid";
import { eq } from 'drizzle-orm';

export const GET = async (request: NextRequest) => {

    const setCookies = cookies()

    const user_id = cookies().get('user_id')?.value

    // console.log(user_id);
    

    try {
        const res = await db.select().from(cartTable).where(eq(cartTable.user_id , user_id as string));
        console.log(res);
        
        return NextResponse.json({ res })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'something went wrong' })
    }
}

export const POST = async (request: NextRequest) => {

    const req = await request.json()

    const uid = uuid()

    const setCookies = cookies()

    const user_id = cookies().get('user_id')

    if (!user_id) {
        setCookies.set('user_id', uid)
    }

    try {
        const res = await db.insert(cartTable).values({
            product_id: req.product_id,
            quantity: req.quantity,
            user_id: cookies().get('user_id')?.value as string
        });
        return NextResponse.json({ res })
    } catch (error) {

    }
}