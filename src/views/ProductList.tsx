import ProductCard from '@/components/ProductCard';
import { products } from '@/utils/mock';
import { StaticImageData } from 'next/image';
import { client } from '@/lib/client';
import { Image as IImage } from 'sanity'



const getProductData = async () => {
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
  product_image: IImage[],
  product_care: string[],
}


const ProductList = async () => {
  // const productChecks = products.slice(0, 3);

  const data: IProduct[] = await getProductData()
  // console.log(data);
  // console.log(productChecks);

  return (
    <div className='flex justify-evenly mt-16 py-10'>
      {
        data.map((product) => {
          // console.log(product.cloth_category.cloth_category_name);
          
          return (
            <ProductCard id={product._id} key={product._id} title={product.title} price={product.price} img={product.product_image as Array<IImage>} category={product.cloth_category.cloth_category_name} />
          )
        })
      }
    </div>
  );
};

export default ProductList;
