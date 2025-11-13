"use client"

import { useEffect, useRef, useState } from "react"

const experiences = [
  {
    title: "Développeur Web",
    company: "Startup Twini",
    year: "2025",
    description: "Planification et conception - Choix des technologies - Développement",
    icon: "💻",
  },
  {
    title: "Recruteur de donateurs",
    company: "Médecins sans Frontières",
    year: "2025",
    description: "Sensibilisation - Relationnel - Discours à l'oral",
    icon: "🤝",
  },
  {
    title: "Équipier polyvalent",
    company: "Jeux Olympiques Paris 2024",
    year: "2024",
    description: "Plonge - Rayonnage - Service - Encaissement - Cuisine - Accueil",
    icon: "🎯",
  },
  {
    title: "Infographiste",
    company: "Conseil Régional Île-de-France",
    year: "2019",
    description: "Besoin client - Communication - Créativité - Gestion du temps",
    icon: "🎨",
  },
]

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-16 max-w-4xl ml-0 md:ml-64 bg-secondary/30">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
        <span className="text-accent">Expérience</span> Professionnelle
      </h2>

      <div className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="relative pl-8 pb-8 border-l-2 border-accent/30 last:border-b-0 hover:border-accent/60 transition-colors duration-300 group"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Timeline dot */}
            <div className="absolute -left-4 top-1 w-6 h-6 bg-accent rounded-full border-4 border-background group-hover:scale-125 transition-transform duration-300" />

            {/* Content */}
            <div className="group-hover:translate-x-2 transition-transform duration-300">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                  <p className="text-accent font-semibold">{exp.company}</p>
                </div>
                <span className="text-3xl flex-shrink-0">{exp.icon}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{exp.year}</p>
              <p className="text-foreground leading-relaxed">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
