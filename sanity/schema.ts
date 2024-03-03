import { type SchemaTypeDefinition } from 'sanity'
import comment from './schemas/comment'
import post from './schemas/post'
import postedBy from './schemas/postedBy'
import user from './schemas/user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user,postedBy,comment,post],
}
