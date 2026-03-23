export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-23'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = process.env.SANITY_API_READ_TOKEN || "skPO3IhWz2M1pe0HUdmzDMaI0Iqyd1oRGSjULuAFfGLwvTehNtmT4N2sVymlRyAVvLuY7LGUUVGPo3l25TgdUCK2OJesBF44LRiuds1a6xxwUa9giN7dU6A4ydTTkVYTApCSlWX5n8C3aCmPkaHtegHWoxCSEL2LoKQKOQwUoHxy14RwnBRE"

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
