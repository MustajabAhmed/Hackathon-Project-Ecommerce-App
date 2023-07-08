import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import AddToCart from '@/components/ui/addToCart'

interface ProductCardProps {
  title: string;
  price: number;
  img: StaticImageData;
}

const ProductCard: FC<ProductCardProps> = ({ title, price, img }) => {
  // console.log(title);
  
  return (
    <div>
      <Image src={img} alt='Product-1' />
      <h3 className='font-bold text-lg mt-3'>{title}</h3>
      <p className='font-bold text-lg'>${price}</p>
      <AddToCart />
    </div>
  );
};

export default ProductCard;
