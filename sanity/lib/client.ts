import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true,
  token
})
