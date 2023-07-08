import ProductCard from "@/components/ProductCard"
import { products } from "@/utils/mock"
import Image, { StaticImageData } from "next/image"
import AddToCart from '@/components/ui/AddToCart'

export default function Page({ params }: { params: { id: number } }) {

  const productDetails = products.filter((product) => product.id == params.id)

  // console.log(params.id, products , productDetails);


  return (
    <div className='flex mt-16 py-10 flex-wrap'>
      {
        productDetails.map((product) => {
          return (
            <div key={product.id} className="flex justify-between gap-6">
              <div>
                <Image src={product.image} alt={product.name} />
              </div>
              <div>
                Product Detail
                <p>Name {product.name}</p>
                <p>Price {product.price}</p>
                <p>Category {product.category}</p>
                <AddToCart />
              </div>

            </div>
          )
        })
      }
    </div>
  )
}