import ProductCard from '@/components/ProductCard';
import { products } from '@/utils/mock';
import { StaticImageData } from 'next/image';
import { client } from '@/lib/client';
import { Image as IImage } from 'sanity'



export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    price, product_image, cloth_type -> {
      cloth_tyoey_name
    }, product_care, cloth_category, title, product_details
  }`)
  return res 
}

interface IProduct {
  title: string,
  description: string
  image: IImage,
}


const ProductList = async () => {
  const productChecks = products.slice(0, 3);

  const data: IProduct[] = await getProductData()
  console.log(data);
  // console.log(productChecks);

  return (
    <div className='flex justify-evenly mt-16 py-10'>
      {
        productChecks.map((product) => {
          return (
            <ProductCard id={product.id} key={product.id} title={product.name} price={product.price} img={product.image as StaticImageData} category={product.category} />
          )
        })
      }
    </div>
  );
};

export default ProductList;
