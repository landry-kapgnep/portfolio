"use client"

import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    name: "Programmation",
    skills: ["Java", "Python", "C", "JavaScript", "TypeScript"],
    icon: "⚙️",
  },
  {
    name: "Web",
    skills: ["HTML/CSS/SCSS", "React.js", "Node.js", "Fastify", "PHP", "Django"],
    icon: "🌐",
  },
  {
    name: "Bases de Données",
    skills: ["SQL", "PostgreSQL", "MariaDB", "MongoDB"],
    icon: "🗄️",
  },
  {
    name: "Outils & Systèmes",
    skills: ["Git/GitHub/GitLab", "VS Code", "Linux/Bash", "Docker", "Windows"],
    icon: "🛠️",
  },
  {
    name: "Design & 3D",
    skills: ["Blender 3D", "Adobe Photoshop", "Adobe Premiere Pro", "Figma"],
    icon: "🎨",
  },
  {
    name: "Game Dev",
    skills: ["Godot Engine", "Unity", "Unreal (Basics)"],
    icon: "🎮",
  },
]

export default function Skills() {
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
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-16 max-w-5xl ml-0 md:ml-64 bg-secondary/30">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
        <span className="text-accent">Mes</span> Compétences
      </h2>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        {skillCategories.map((category, idx) => (
          <div
            key={idx}
            className="group relative bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Hover background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {category.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full border border-accent/30 group-hover:border-accent/60 group-hover:bg-accent/20 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-12 p-6 bg-card border border-border rounded-lg">
        <p className="text-foreground leading-relaxed">
          <span className="text-accent font-semibold">En apprentissage :</span> Mandarin · Machine Learning · Advanced
          DevOps
        </p>
      </div>
    </section>
  )
}
