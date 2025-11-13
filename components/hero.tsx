"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-16 pt-20 md:pt-0 bg-gradient-to-br from-background to-secondary">
      <div className="max-w-3xl w-full">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Greeting */}
          <p className="text-accent text-lg md:text-xl font-semibold mb-4 animate-fade-in-up">Salut 👋, Je suis</p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            Landry
            <br />
            <span className="text-accent">Kapgnep</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            Étudiant en <span className="text-foreground font-semibold">BUT 2 Informatique</span> passionné par le
            développement web, les jeux vidéo et l'art 3D.
            <br />
            <span className="text-sm md:text-base italic text-accent mt-4 block">
              "Je crée des expériences numériques engageantes et performantes."
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#projects"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-center animate-glow"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-all duration-300 text-center"
            >
              Me contacter
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-12 animate-bounce">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
