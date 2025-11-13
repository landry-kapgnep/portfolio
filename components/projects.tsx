"use client"

import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "Site de recensement de jeux de société",
    period: "sept. 2024 - janv. 2025",
    description: "Entretiens en groupe, choix du stack technologique et développement",
    tags: ["React", "Node.js", "Database", "Full Stack"],
    icon: "🎲",
  },
  {
    title: "Site pour un événement culturel",
    period: "sept. 2022 - janv. 2023",
    description: "Entretiens avec le client puis développement d'un site internet en accord avec les besoins du client",
    tags: ["Web Design", "Client Communication", "HTML/CSS"],
    icon: "🎭",
  },
  {
    title: "Services réseau LAMP",
    period: "février - avril 2023",
    description: "Déploiement d'un service réseau dans un environnement LAMP",
    tags: ["Linux", "Apache", "PHP", "MariaDB"],
    icon: "🌐",
  },
  {
    title: "Serveur RaspberryPi",
    period: "septembre - décembre 2022",
    description: "Installation de Raspbian, déploiement d'un serveur apache2, gestion de base de données",
    tags: ["Raspbian", "Linux", "Server", "Database"],
    icon: "🖥️",
  },
]

export default function Projects() {
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
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-16 max-w-5xl ml-0 md:ml-64">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
        <span className="text-accent">Mes</span> Projets
      </h2>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="group relative bg-card border border-border rounded-lg p-6 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-2"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{project.icon}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{project.period}</span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full border border-accent/30 group-hover:border-accent/60 group-hover:bg-accent/20 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
