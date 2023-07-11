import ProductCard from "@/components/ProductCard"
import { products } from "@/utils/mock"
import { StaticImageData } from "next/image"
import { client } from '@/lib/client';
import { Image as IImage } from 'sanity'

export const getProductData = async () => {
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
  product_details: string
  cloth_category_name: string,
  // cloth_category: string,
  product_image: IImage[],
  product_care: string[],
}

export default async function Page({ params }: { params: { slug: string } }) {

  const data: IProduct[] = await getProductData()

  const productDetails = data.filter((product) =>  product.cloth_category.cloth_category_name.toLowerCase() === params.slug)


  // const filteredProducts = products.filter((product) => product.category === params.slug)

  return (
    <div className='flex justify-evenly mt-16 py-10 flex-wrap'>
      {
        productDetails.length > 0 ? productDetails.map((product) => {
          return (
            <ProductCard id={product._id} key={product._id} title={product.title} price={product.price} img={product.product_image as Array<IImage>} category={product.cloth_category.cloth_category_name} />
          )
        }) : <p>No Products Found</p>
      }
      {/* <ProductCard title="Product 1" price={123} img={P1} />
      <ProductCard title="Product 2" price={456} img={P2} />
      <ProductCard title="Product 3" price={789} img={P3} /> */}

    </div>
  )
}