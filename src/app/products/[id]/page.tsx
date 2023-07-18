'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/lib/client";
import { urlForImage } from "@/lib/image";
import { Image as IImage } from 'sanity'
import { toast } from "react-hot-toast";
import Quantity from "@/components/Quantity";

const getProductData = async () => {
  const res = await client.fetch(
    `*[_type=="product"]{
      price,
      product_image,
      cloth_type->{
        cloth_type_name
      },
      product_care,
      cloth_category,
      title,
      product_details,
      _id
    }`
  );
  return res;
};

interface IProduct {
  _id: string;
  title: string;
  price: number;
  cloth_type_name: string;
  product_details: string;
  cloth_category: IClothCategory;
  product_image: IImage[];
  product_care: string[];
}

interface IClothCategory {
  cloth_category_name: string;
}

interface PageProps {
  params: { id: string };
}

const Page = ({ params }: PageProps) => {
  const [quantity, setQuantity] = useState(1);
  const [productDetail, setProductDetail] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const data: IProduct[] = await getProductData();
      const productDetails = data.filter((product) => product._id === params.id);
      const productDetail = productDetails[0];
      setProductDetail(productDetail);
    };

    fetchProductDetails();
  }, [params.id]);

  const handleAddToCart = async () => {
    const res = await fetch("../api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: params.id,
        quantity: quantity,
      }),
    });

    const result = await res.json();
    if (result) {
      toast.success("Product Added Successfully")
    }
  };

  const sizes = ["xs", "sm", "md", "lg", "xl"];

  const totalPrice = productDetail?.price ? productDetail.price * quantity : 0;

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  console.log(productDetail.product_image);
  

  return (
    <div>
      <div className="flex mt-16 py-10 flex-wrap">
        <div className="row flex justify-content-center gap-x-4">
          <div className="col-12 py-10 px-10 align-items-center">
            <div className="flex justify-between gap-6">
              <div>
                <Image
                  width={380}
                  height={400}
                  src={urlForImage(productDetail.product_image[0]).width(200).url()}
                  alt={productDetail.title}
                />
              </div>
              <div>
                <div>
                  <h1 className="text-2xl">{productDetail.title}</h1>
                  <h2 className="text-base text-gray-400 font-semibold">
                    {productDetail.cloth_type_name}
                  </h2>
                </div>
                <div>
                  <h3 className="text-xs mt-6 font-semibold">SELECT SIZE</h3>
                  <div className="flex gap-x-3">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className="h-6 w-6 flex justify-center items-center duration-300 border rounded-full hover:shadow-xli"
                      >
                        <span className="text-[10px] font-bold text-center text-gray-600">
                          {size}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-x-3 mt-6 items-center">
                    <h3 className="text-[10px] font-semibold">Quantity:</h3>
                    <Quantity num={quantity} setNum={setQuantity} />
                  </div>
                  <div className="mt-5 flex items-center gap-x-4">
                    <button
                      onClick={handleAddToCart}
                      className="border bg-blue-500 text-white rounded px-3 py-3"
                    >
                      Add to Cart
                    </button>
                    <h2 className="text-2xl font-bold">
                      ${totalPrice.toFixed(2)}
                    </h2>
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
            <h1 className="text-2xl font-semibold">Product Information</h1>
          </div>
          <div className="flex py-5 justify-start gap-x-9 mt-5">
            <h2>PRODUCT DETAILS</h2>
            <div>
              <p>{productDetail.product_details}</p>
            </div>
          </div>
          <div className="flex py-5 justify-start gap-x-9 mt-5">
            <h2>PRODUCT CARES</h2>
            <div>
              <ul>
                {productDetail.product_care.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
