import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Heart, Code } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navigation = {
    main: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Skills", href: "/skills" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    social: [
      {
        name: "GitHub",
        href: "https://github.com/arafat20mupi",
        icon: Github,
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/arafatislam03",
        icon: Linkedin,
      },
      {
        name: "Twitter",
        href: "https://x.com/arafat_isl49899",
        icon: Twitter,
      },
      {
        name: "Email",
        href: "mailto:arafatislam6619@gmail.com",
        icon: Mail,
      },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-purple-600 rounded-lg p-2">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">Arafat Islam</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Full-stack developer passionate about creating beautiful, functional web experiences. Always learning,
              always building.
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.name} href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
            <div className="space-y-2 text-gray-400">
              <p>Dinajpur, Bangladesh</p>
              <p>arafatislam6619@gmail.com</p>
              <p>+880 1722-172906</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {currentYear} Arafat Islam. All rights reserved.</p>
            <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by Arafat Islam
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
