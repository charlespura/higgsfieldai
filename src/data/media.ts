import manifest from './media-manifest.json'

type Asset = { src: string | null; expected: string }
type MediaManifest = {
  provider: string
  status: string
  hero: Asset
  feature: Asset
  projects: Record<string, Asset>
}

export const media: MediaManifest = manifest
