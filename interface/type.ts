export interface IProject {
  _id: string
  title: string
  description: string
  longDescription: string
  image: string
  images: string[]
  tech: string[]
  category: string
  featured: boolean
  live: string
  github: string
  duration: string
  team: string
  year: string
  features: string[]
  challenges: { title: string; description: string }[]
  testimonial?: { text: string; author: string; role: string }
}
