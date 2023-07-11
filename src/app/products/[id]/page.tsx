import ProductCard from "@/components/ProductCard"
import { products } from "@/utils/mock"
import Image, { StaticImageData } from "next/image"
import AddToCart from '@/components/ui/AddToCart'
import Quantity from "@/components/Quantity"
import { client } from '@/lib/client';
import { Image as IImage } from 'sanity'
import { urlForImage } from '@/lib/image';

const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    price, product_image, cloth_type -> {
      cloth_tyoey_name
    }, product_care, cloth_category, title, product_details, _id
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
export default async function Page({ params }: { params: { id: string } }) {

  const data: IProduct[] = await getProductData()

  const productDetails = data.filter((product) => product._id == params.id)

  const productDetail = productDetails[0];

  // console.log(productDetails[0]);

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];


  return (
    <div>

      <div className='flex mt-16 py-10 flex-wrap'>
        <div className="row flex justify-content-center gap-x-4 ">
          <div className="col-12 py-10 px-10 align-items-center">
            <div key={productDetail._id} className="flex justify-between gap-6">
              <div>
                <Image width={380} height={400} src={urlForImage(productDetail.product_image[0]).width(200).url()} alt={productDetail.title} />
              </div>
              <div>
                <div>
                  <h1 className="text-2xl">{productDetail.title}</h1>
                  <h2 className="text-base text-gray-400 font-semibold">{productDetail.cloth_type_name}</h2>
                </div>
                <div>
                  <h3 className="text-xs mt-6 font-semibold">
                    SELECT SIZE
                  </h3>
                  <div className="flex gap-x-3">
                    {
                      sizes.map((size) => (
                        <div key={size} className="h-6 w-6 flex justify-center items-center duration-300 border rounded-full hover:shadow-xli">
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
                    <h2 className="text-2xl font-bold">${productDetail.price.toFixed(2)}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 py-10 px-10">
        <div>
          <div>
            <h1 className="text-2xl font-semibold ">
              Product Information
            </h1>
          </div>
          <div className="flex py-5 justify-start gap-x-9 mt-5">
            <h2>PRODUCT DETAILS</h2>
            <div>
              <p>{productDetail.product_details}</p>
            </div>
          </div>
          <div className="flex py-5 justify-start gap-x-9 mt-5">
            <h2>
              PRODUCT CARES
            </h2>
            {/* <p> */}
            <div>
              <ul>
                {
                  productDetail.product_care.map((item) => (
                    <li key={item}>{item}</li>
                  ))
                }
              </ul>
            </div>
            {/* </p> */}
          </div>
        </div>
      </div>
    </div>
  )
}