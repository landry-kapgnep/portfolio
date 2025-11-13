"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="flex-1 overflow-y-auto">
        <Hero />

        <div id="about" className="scroll-mt-20">
          <About />
        </div>

        <div id="experience" className="scroll-mt-20">
          <Experience />
        </div>

        <div id="projects" className="scroll-mt-20">
          <Projects />
        </div>

        <div id="skills" className="scroll-mt-20">
          <Skills />
        </div>

        <div id="contact" className="scroll-mt-20">
          <Contact />
        </div>
      </main>
    </div>
  )
}
