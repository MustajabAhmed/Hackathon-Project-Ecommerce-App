import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { cloth_category } from './cloth_category'
import { cloth_size } from './cloth_size'
import { cloth_type } from './cloth_type'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, cloth_category, cloth_size, cloth_type],
}
