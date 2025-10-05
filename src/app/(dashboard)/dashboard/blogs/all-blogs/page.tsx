import { BlogPost } from "@/src/types"
import { Button } from "@/src/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import BlogCard from "@/src/components/modules/blogs/BlogCard"

export default async function AllBlogsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
    cache: "no-store",
    next: { tags: ["blogs"] },
  })
  const posts: BlogPost[] = await res.json()

  console.log(posts);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Blog Posts</h1>
          <p className="text-gray-600 mt-2">Server-side rendered with caching + tags</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/blogs/add-blog">
            <Plus className="h-4 w-4 mr-2" />
            Write New Post
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No blog posts available.</p>
        </div>
      )}
    </div>
  )
}
