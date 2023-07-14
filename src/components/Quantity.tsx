'use client'

import { useState } from "react";

interface QuantityProps {
    num: number;
    setNum: (value: number) => void;
  }

const Quantity = ({ num, setNum }: QuantityProps) => {

    // let num = 1;
    // const [num, setNum] = useState(1)


    return (
        <div className="flex gap-x-2 items-center">
            <button
                onClick={() => {
                    setNum(num <= 1 ? 1 : num - 1)
                }}
                className="border h-6 w-6 rounded-full flex justify-center items-center">
                -
            </button>
            <span className="text-sm ">
                {num}
            </span>
            <button
                onClick={() => {
                    setNum(num + 1)
                }}
                className="border h-6 w-6 rounded-full flex justify-center items-center">
                +
            </button>
        </div>
    )
}

export default Quantity



// export const operationButton = () => {
//     return (
//         <div className="border h-6 w-6 rounded-full flex justify-center items-center">
//             -
//         </div>
//     )
// }