import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import heroImage from '/public/hero-img.webp'
import Image from 'next/image'


const Hero = () => {
    return (
        <section className="flex flex-col gap-y-10 lg:flex-row py-6 ">
            <div className="flex-1">
                <Badge className="py-3 px-6 rounded-lg bg-blue-200 text-blue-700 ">Badge</Badge>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-6">
                    An Industrial Take on Streetwear
                </h1>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Once upon a time, in a far-off land, there was a very lazy king who
                    spent all day lounging on his throne. One day, his advisors came to him
                    with a problem: the kingdom was running out of money.
                </p>
                <Button className="bg-black text-white h-12 px-8 mt-4">
                    Start Shopping
                </Button>
            </div>


            <div className="flex-1">
                <Image src={heroImage} alt="hero_image"/>
            </div>
        </section>
    )
}


export default Hero