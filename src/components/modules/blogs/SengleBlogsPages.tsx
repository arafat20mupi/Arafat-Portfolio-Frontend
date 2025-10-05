"use client"

import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Calendar, Clock, ArrowLeft, } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { BlogPost } from "@/src/types"
const SengleBlogsPages = ({ post }: { post: BlogPost }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }
    return (
        <div>
            {/* Hero Section */}
            <motion.section
                className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container mx-auto px-4">
                    <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
                        <motion.div variants={itemVariants}>
                            <Button asChild variant="ghost" className="mb-6">
                                <Link href="/blog">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Blog
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="text-center">
                            <Badge variant="secondary" className="mb-4">
                                {post.category}
                            </Badge>
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{post.excerpt}</p>

                            <div className="flex items-center justify-center gap-6 mb-8">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={post.author?.picture || "/placeholder.svg"} alt={post.author?.name || "Author"} />
                                        <AvatarFallback>AU</AvatarFallback>
                                    </Avatar>
                                    <div className="text-left">
                                        <div className="font-medium text-gray-900">{post.author?.name}</div>
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-gray-300"></div>
                                <div className="flex items-center gap-4 text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(post.date).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {post.readTime}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Featured Image */}
            <motion.section
                className="py-12 bg-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                width={800}
                                height={400}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Article Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SengleBlogsPages;