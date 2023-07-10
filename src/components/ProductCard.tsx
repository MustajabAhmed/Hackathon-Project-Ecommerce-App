import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import Link from 'next/link';
import { Image as IImage } from 'sanity'
import { urlForImage } from '@/lib/image';
// import { urlForImage } from 'sanity/lib/image';
// import { urlForImage } from '../../sanity/lib/image'

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  img: IImage[];
  category: string;
}

const ProductCard: FC<ProductCardProps> = ({ id, title, img, price, category }) => {
  // console.log(id);

  // img.map((item) => (
  //   console.log(item)

  // ))

  return (
    <Link href={`/products/${id}`}>
      <div className='py-5 mx-3'>
        {
          // console.log(img);

          // img.map( (item) => (

          <Image  width={380} height={400} className='object-cover object-top max-h-[340px]' src={urlForImage(img[0]).width(200).url()} alt={title} />
          // ))
        }

        <h3 className='font-bold text-lg mt-3'>{title}</h3>
        <p className='font-bold text-lg'>${price}</p>
        <p className='font-bold text-lg'>
          Category <span className='text-base font-normal capitalize'>{category}</span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
