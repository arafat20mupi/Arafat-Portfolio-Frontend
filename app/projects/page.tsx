"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Github, ExternalLink, Search, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"
import { IProject } from "@/interface/type"



const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://arafat-portfolio-backend.vercel.app/api"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get(`${API_BASE_URL}/projects`)
      console.log(response.data);
      setProjects(response.data)
    }

    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="py-16 bg-gradient-to-br from-purple-50 to-blue-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">My Projects</h1>
            <p className="text-xl text-gray-600 mb-8">
              A collection of projects that showcase my skills and experience in web development. Each project
              represents a unique challenge and learning opportunity.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search projects..." className="pl-10" />
              </div>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>


      {/* All Projects */}
      <section className=" bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Link href={`/projects/${project._id}`} key={project._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tech.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tech.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-4">
                        {project.github && project.github !== "" && (
                          <Link href={project.github} className="text-gray-600 hover:text-gray-900">
                            <Github className="h-5 w-5" />
                          </Link>
                        )}
                        <Link href={project.live} className="text-gray-600 hover:text-gray-900 transition-colors">
                          <ExternalLink className="h-5 w-5" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Interested in working together?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and create amazing digital experiences.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Start a Project</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
