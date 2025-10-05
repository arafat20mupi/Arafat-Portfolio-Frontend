import { notFound } from "next/navigation"
import SengleBlogsPages from "@/src/componentsmodules/blogs/SengleBlogsPages"

// ISR জন্য সব params generate করবে
export async function generateStaticParams() {
  const blogData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`).then(res => res.json())
  return blogData.map((post: { id: string }) => ({ id: post.id.toString() }))
}

// Single blog fetcher
async function getBlog(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
    next: { tags: [`blog:${id}`] },
  })

  if (!res.ok) return null
  return res.json()
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlog(params.id)

  if (!post) notFound()

  return (
    <div className="min-h-screen pt-20">
      <SengleBlogsPages post={post} />
    </div>
  )
}
