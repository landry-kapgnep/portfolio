"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sections = [
    { id: "about", label: "à propos" },
    { id: "experience", label: "expérience" },
    { id: "projects", label: "projets" },
    { id: "skills", label: "compétences" },
    { id: "contact", label: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections, setActiveSection])

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card hover:bg-secondary transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative w-64 h-screen md:h-auto flex flex-col border-r border-border bg-secondary md:bg-transparent pt-20 md:pt-0 transition-transform duration-300 z-40 md:z-auto`}
      >
        {/* Logo/Name */}
        <div className="px-8 py-6 md:py-12 border-b border-border">
          <h1 className="text-2xl font-bold text-accent animate-slide-in-left">Landry</h1>
          <p className="text-sm text-muted-foreground mt-2">Développeur Full Stack</p>
        </div>

        {/* Navigation Links */}
        <ul className="flex-1 px-4 py-8 space-y-2">
          {sections.map((section, idx) => (
            <li key={section.id}>
              <button
                onClick={() => handleNavClick(section.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 text-sm tracking-wide ${
                  activeSection === section.id
                    ? "text-accent bg-accent/10 border-l-2 border-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                }`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Social Links */}
        <div className="px-8 py-6 border-t border-border space-y-3">
          <a
            href="mailto:landrykapgnep01@gmail.com"
            className="flex items-center text-sm text-muted-foreground hover:text-accent transition-colors truncate"
            title="Email"
          >
            <span className="mr-2">✉</span>
            <span className="truncate">landrykapgnep01@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/landry-kapgnep"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-muted-foreground hover:text-accent transition-colors"
            title="LinkedIn"
          >
            <span className="mr-2">in</span>
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-muted-foreground hover:text-accent transition-colors"
            title="GitHub"
          >
            <span className="mr-2">⚙</span>
            GitHub
          </a>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}
