import { config } from "@/utils/config"

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-02'

export const dataset = assertValue(
  config.sanityDataset,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  config.sanityId,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  config.sanityApitoken,
  'Missing environment variable: NEXT_PUBLIC_SANITY_API_TOKEN'
)

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
