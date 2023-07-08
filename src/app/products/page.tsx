import { products } from '@/utils/mock';
import ProductCard from '@/components/ProductCard';
import { StaticImageData } from 'next/image';

const AllProducts = () => {
  return (
    <div className='flex justify-evenly mt-16 py-10 flex-wrap'>
      {
        products.map((product) => {
          return (
            <ProductCard id={product.id} key={product.id} title={product.name} price={product.price} img={product.image as StaticImageData} category={product.category} />
          )
        })
      }
      {/* <ProductCard title="Product 1" price={123} img={P1} />
      <ProductCard title="Product 2" price={456} img={P2} />
      <ProductCard title="Product 3" price={789} img={P3} /> */}

    </div>
  )
}

export default AllProducts