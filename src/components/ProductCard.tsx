import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';


interface ProductCardProps {
  title: string;
  price: number;
  img: StaticImageData;
}

const ProductCard: FC<ProductCardProps> = ({ title, price, img }) => {
  console.log(title);
  
  return (
    <div>
      <Image src={img} alt='Product-1' />
      <h3 className='font-bold text-lg mt-3'>{title}</h3>
      <p className='font-bold text-lg'>${price}</p>
    </div>
  );
};

export default ProductCard;
