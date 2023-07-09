import { defineField, defineType } from "sanity"

export const cloth_category = defineType({
    name: 'cloth_category',
    title: 'Cloth Category',
    type: 'document',
    fields: [
        defineField({
            name: 'cloth_category_name',
            title: 'Cloth Category Title',
            type: 'string',
        }),
    ]
})