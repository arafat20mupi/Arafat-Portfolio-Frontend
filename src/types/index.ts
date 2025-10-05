export interface Author {
  id: number
  name: string
  email: string
  password: string
  role: "USER" | "ADMIN" // বা অন্য যেটা relevant
  phone: string
  picture: string | null
  status: "ACTIVE" | "INACTIVE"
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  readTime: string
  date: string
  tags: string[]
  likes: number
  comments: number
  shares: number
  featured: boolean
  published: boolean
  authorId: number
  createdAt: string
  updatedAt: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  author: Author
}
