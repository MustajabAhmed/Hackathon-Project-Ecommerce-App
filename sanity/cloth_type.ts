import { defineField, defineType } from "sanity"

export const cloth_type = defineType({
    name: 'cloth_type',
    title: 'Cloth Type',
    type: 'document',
    fields: [
        defineField({
            name: 'cloth_tyoey_name',
            title: 'Cloth Type Title',
            type: 'string',
        }),
    ]
})