"use client"


import { ArrowRight, Download, Github, Linkedin, Mail, ExternalLink, icons } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { IProject } from "@/src/interface/type"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"


export default function HomePage() {
  const [projects, setProjects] = useState<IProject[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get(`${API_BASE_URL}/projects`)
      console.log(response.data);
      setProjects(response.data)
    }

    fetchProjects()
  }, [])

  const skills = [
    {
      icons: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
      title: "Javascript"
    },
    {
      icons: "https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000",
      title: "TypeScript"
    },
    {
      icons: "https://img.icons8.com/?size=100&id=9vlfB9hjA1lX&format=png&color=000000",
      title: "React"
    },
    {
      icons: "https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000",
      title: "Next.js"
    },
    {
      icons: "https://img.icons8.com/?size=100&id=54087&format=png&color=000000",
      title: "Node.js"
    },
    {
      icons: "https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=000000",
      title: "Express.js"
    },
    // {
    // icons: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
    // title: "Python"
    // },
    {
      icons: "https://img.icons8.com/?size=100&id=38561&format=png&color=000000",
      title: "PostgreSQL"
    },
    {
      icons: "https://img.icons8.com/?size=100&id=8rKdRqZFLurS&format=png&color=000000",
      title: "MongoDB"
    },
    {
      icons: "https://img.icons8.com/?size=100&id=gKfcEStXI1Hm&format=png&color=000000",
      title: "Mongoose"
    },
    // {
    //   icons: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
    //   title: "AWS"
    // },
    // {
    //   icons: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
    //   title: "Docker"
    // },
    {
      icons: "https://img.icons8.com/?size=100&id=20906&format=png&color=000000",
      title: "Git"
    },
    {
      icons: "https://img.icons8.com/?size=100&id=efFfwotdkiU5&format=png&color=000000",
      title: "GitHub"
    },
    {
      icons: "https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000",
      title: "Tailwind CSS"
    },
    {
      icons: "https://img.icons8.com/?size=100&id=b6vIINYN0kfW&format=png&color=000000",
      title: "Redux"
    },
    {
      icons: "https://img.icons8.com/?size=100&id=62452&format=png&color=000000",
      title: "Firebase"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Image
              src="/arafat.jpg"
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-6 border-4 border-white/20"
            />
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Hi, I'm <span className="text-purple-400">Arafat Islam</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Full-Stack Developer crafting beautiful, functional web experiences with modern technologies
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </motion.div>
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link href="https://github.com/arafat20mupi" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://www.linkedin.com/in/arafatislam03" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="mailto:arafatislam6619@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="h-6 w-6" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I work with modern technologies to build scalable and efficient applications
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gray-100 rounded-lg p-4 hover:bg-purple-50 transition-colors">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">
                      <Image src={skill.icons} alt={skill.title} width={24} height={24} />
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{skill.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.slice(0, 3).map((project, index) => (
              <Link href={`/projects/${project.id}`} key={project.id}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech : string) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        {project.github && project.github !== "" && (
                          <Link href={project.github} className="text-gray-600 hover:text-gray-900">
                            <Github className="h-5 w-5" />
                          </Link>
                        )}
                        <Link href={project.live} className="text-gray-600 hover:text-gray-900">
                          <ExternalLink className="h-5 w-5" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to work together?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas
            to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Start a Project</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/resume.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
