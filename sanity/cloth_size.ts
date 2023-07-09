import { defineField, defineType } from "sanity"

export const cloth_size = defineType({
    name: 'cloth_size',
    title: 'Cloth Size',
    type: 'document',
    fields: [
        defineField({
            name: 'cloth_size',
            title: 'Cloth Size',
            type: 'string',
        }),
    ]
})