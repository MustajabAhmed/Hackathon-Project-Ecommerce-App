'use client'
import { useDispatch } from "react-redux"
import { Button } from "./button"
import { cartActions } from "@/store/slice/cartSlice";
import { toast } from "react-hot-toast";

const AddToCart = () => {

  const dispatch = useDispatch();
  const addItem = () => {
    dispatch(cartActions.addToCart({ quantity: 1 }));
    toast.success("Product Added Successfully")
  };

  return (
    <Button className="bg-black rounded text-white hover:bg-gray-500 hover:text-black" onClick={addItem}>
      Add To Cart
    </Button>
  )
}

export default AddToCart