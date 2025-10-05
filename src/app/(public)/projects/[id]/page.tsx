"use client"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Github, ExternalLink, ArrowLeft, Calendar, Clock, Users, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { IProject } from "@/interface/type"


export default function ProjectDetailPage({ params }: { params: { id: string } }) {

  const [project, setProject] = useState<IProject | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/${params.id}`)
        setProject(response.data)
      } catch (error) {
        console.error("Failed to fetch project:", error)
        notFound()
      }
    }
    fetchProject()
  }, [params.id])


  console.log(project);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen pt-20">
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
                <Link href="/projects">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <Badge variant="secondary" className="mb-4">
                {project.category}
              </Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">{project.title}</h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{project.description}</p>

              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{project.team}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href={project.live} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Demo
                  </Link>
                </Button>
                {
                  project?.github && (
                    <Button asChild variant="outline" size="lg">
                      <Link href={project?.github} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        View Source Code
                      </Link>
                    </Button>
                  )
                }
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Image */}
      <motion.section
        className="py-12 bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Project Details */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
                <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                  {project.longDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      <div dangerouslySetInnerHTML={{ __html: paragraph }} />
                    </p>
                  ))}
                </div>

                {/* Features */}
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="bg-green-100 rounded-full p-1">
                        <Star className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Challenges */}
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Challenges</h3>
                <div className="space-y-6 mb-12">
                  {project.challenges.map((challenge, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{challenge.title}</h4>
                      <p className="text-gray-600">{challenge.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Gallery */}
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.images.map((image, index) => (
                    <motion.div
                      key={index}
                      className="relative overflow-hidden rounded-lg shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} screenshot ${index + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Tech Stack */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Project Links */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Links</h3>
                    <div className="space-y-3">
                      <Button asChild className="w-full justify-start">
                        <Link href={project.live} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>

                      {project.github && project.github !== "" && (
                        <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                          <Link href={project.github} target="_blank">
                            <Github className="mr-2 h-4 w-4" />
                            Source Code
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Testimonial */}
                {project.testimonial && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Client Feedback</h3>

                      <blockquote className="text-gray-600 italic mb-4">
                        "{project.testimonial.quote}"
                      </blockquote>

                      <div className="flex items-center gap-4">
                        {project.testimonial.image && (
                          <img
                            src={project.testimonial.image}
                            alt={project.testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                        )}
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {project.testimonial.name}
                          </div>
                          <div className="text-gray-500">
                            {project.testimonial.role} • {project.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-purple-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Interested in similar work?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            I'd love to discuss your project and see how we can create something amazing together.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Start a Project</Link>
          </Button>
        </div>
      </motion.section>
    </div>
  )
}
