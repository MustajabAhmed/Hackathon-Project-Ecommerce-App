// Quantity.tsx

import { useState } from "react";

interface QuantityProps {
    num: number;
    setNum: (value: number) => void;
    onQuantityChange?: (value: number) => void; // Add onQuantityChange prop
}

const Quantity = ({ num, setNum, onQuantityChange }: QuantityProps) => {
    const [localNum, setLocalNum] = useState(num);

    const handleDecrease = () => {
        const updatedNum = localNum > 1 ? localNum - 1 : 1;
        setLocalNum(updatedNum);
        setNum(updatedNum);
        if (onQuantityChange) {
            onQuantityChange(updatedNum);
        }
    };

    const handleIncrease = () => {
        const updatedNum = localNum + 1;
        setLocalNum(updatedNum);
        setNum(updatedNum);
        if (onQuantityChange) {
            onQuantityChange(updatedNum);
        }
    };

    return (
        <div className="flex gap-x-2 items-center">
            <button
                onClick={handleDecrease}
                className="border h-6 w-6 rounded-full flex justify-center items-center"
            >
                -
            </button>
            <span className="text-sm">{localNum}</span>
            <button
                onClick={handleIncrease}
                className="border h-6 w-6 rounded-full flex justify-center items-center"
            >
                +
            </button>
        </div>
    );
};

export default Quantity;
