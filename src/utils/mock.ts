import { Product } from "./types";
import P1 from 'public/product-1.webp';
import P2 from 'public/product-2.png';
import P3 from 'public/product-3.png';

export const products: Product[] = [
    {
        id: 1,
        name: 'Product 1',
        category: 'female',
        price: 20,
        image: P1,
    },
    {
        id: 2,
        name: 'Product 2',
        category: 'female',
        price: 203,
        image: P1,
    },
    {
        id: 3,
        name: 'Product 3',
        category: 'female',
        price: 210,
        image: P1,
    },
    {
        id: 4,
        name: 'Product 4',
        category: 'male',
        price: 110,
        image: P1,
    },
    {
        id: 5,
        name: 'Product 5',
        category: 'male',
        price: 310,
        image: P1,
    },
    {
        id: 6,
        name: 'Product 6',
        category: 'kids',
        price: 510,
        image: P1,
    },
    {
        id: 7,
        name: 'Product 7',
        category: 'kids',
        price: 510,
        image: P1,
    },
];

