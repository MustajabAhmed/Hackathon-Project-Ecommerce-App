import { defineField, defineType } from "sanity"

export const product = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [

        defineField({
            name: 'title',
            title: 'Product Title',
            type: 'string',
        }),

        defineField({
            name: 'cloth_category',
            title: 'Cloth Category',
            type: 'reference',
            to: [{ type: 'cloth_category' }]
        }),

        defineField({
            name: 'cloth_type',
            title: 'Cloth Type',
            type: 'reference',
            to: [{ type: 'cloth_type' }]
        }),

        // defineField({
        //     name: 'cloth_size',
        //     title: 'Cloth Size',
        //     type: 'reference',
        //     to: [{ type: 'cloth_size' }]
        // }),

        defineField({
            name: 'price',
            title: 'Product Price',
            type: 'number',
        }),

        defineField({
            name: 'product_details',
            title: 'Product details',
            type: 'string'
        }),

        defineField({
            name: 'product_care',
            title: 'Product Care',
            type: 'array',
            of: [{ type: 'string' }]
        }),

        defineField({
            name: 'product_image',
            title: 'Product Image',
            type: 'array',
            of: [{ type: 'image' }]
        }),
    ]
})