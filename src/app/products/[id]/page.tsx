import ProductCard from "@/components/ProductCard"
import { products } from "@/utils/mock"
import Image, { StaticImageData } from "next/image"
import AddToCart from '@/components/ui/AddToCart'
import Quantity from "@/components/Quantity"


export default function Page({ params }: { params: { id: number } }) {

  const productDetails = products.filter((product) => product.id == params.id)

  // console.log(params.id, products , productDetails);

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];


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
                <div>
                  <h1 className="text-2xl">{product.name}</h1>
                  <h2 className="text-base text-gray-400 font-semibold">{product.tagline}</h2>
                  {/* <p>Name {product.name}</p>
                  <p>Price {product.price}</p>
                  <p>Category {product.category}</p>
                  <AddToCart /> */}
                </div>
                <div>
                  <h3 className="text-xs mt-6 font-semibold">
                    SELECT SIZE
                  </h3>
                  <div className="flex gap-x-3">
                    {
                      sizes.map((size) => (
                        <div className="h-6 w-6 flex justify-center items-center duration-300 border rounded-full hover:shadow-xli">
                          <span className="text-[10px] font-bold text-center text-gray-600">
                            {size}
                          </span>
                        </div>
                      ))
                    }
                  </div>
                  <div className="flex gap-x-3 mt-6 items-center">
                    <h3 className="text-[10px] font-semibold">
                      Quantity:
                    </h3>
                    <Quantity />
                  </div>

                  <div className="mt-5 flex items-center gap-x-4">
                    <AddToCart />
                    <h2 className="text-2xl font-bold">${product.price.toFixed(2)}</h2>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}