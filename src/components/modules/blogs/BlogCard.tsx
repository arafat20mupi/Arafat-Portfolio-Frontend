"use client"

import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Edit, Trash2, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BlogPost } from "@/src/types"
import { revalidateTag } from "next/cache"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface Props {
  post: BlogPost
}

export default function BlogCard({ post }: Props) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${post.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      next: { tags: ["blogs"] },
    })

    if (!res.ok) {
      toast.error("Failed to delete blog post")
      return
    }

    toast.success("Blog post deleted")
    revalidateTag("blogs")
    router.refresh()
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {post.featured && (
            <Badge className="bg-yellow-500">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge className={post.published ? "bg-green-500" : "bg-gray-500"}>
            {post.published ? "Published" : "Draft"}
          </Badge>
        </div>
        <Badge className="absolute top-2 left-2" variant="outline">
          {post.category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
        <div className="flex gap-2">
          <Link href={`/dashboard/blogs/edit/${post.id}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-3 w-3" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={handleDelete}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
