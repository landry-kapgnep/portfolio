"use client"

import { useEffect, useRef, useState } from "react"

export default function About() {
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
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-16 max-w-4xl ml-0 md:ml-64">
      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
          <span className="text-accent">À</span> propos
        </h2>

        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-lg text-foreground leading-relaxed">
            Je suis <span className="font-semibold text-accent">Landry Kapgnep</span>, un développeur passionné basé en
            Île-de-France. Actuellement en <span className="font-semibold">deuxième année de BUT Informatique</span> à
            l'IUT de la Sorbonne Paris Nord, j'explore constamment les frontières de la technologie.
          </p>

          <p className="text-lg text-foreground leading-relaxed">
            Mon intérêt couvre plusieurs domaines : le{" "}
            <span className="font-semibold">développement web full-stack</span> avec React et Node.js, la{" "}
            <span className="font-semibold">création de jeux vidéo</span> avec Godot et Unity, ainsi que l'
            <span className="font-semibold">art 3D avec Blender</span>. Cette diversité me permet d'apporter des
            perspectives uniques à chaque projet.
          </p>

          <p className="text-lg text-foreground leading-relaxed">
            Ce que je recherche :{" "}
            <span className="italic">
              des challenges techniques, une équipe collaborative et l'opportunité de créer quelque chose de
              significatif.
            </span>{" "}
            Je suis à la recherche d'un <span className="font-semibold">stage en informatique</span> à partir du 24
            janvier pour 8-10 semaines.
          </p>

          {/* Quick Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
            <div className="flex items-start">
              <span className="text-accent mr-3 text-xl">🎓</span>
              <div>
                <p className="font-semibold text-foreground">Éducation</p>
                <p className="text-sm text-muted-foreground">BUT Informatique, Bac Général NSI</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-accent mr-3 text-xl">🌍</span>
              <div>
                <p className="font-semibold text-foreground">Langues</p>
                <p className="text-sm text-muted-foreground">Anglais C1, Allemand, Mandarin</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-accent mr-3 text-xl">🏆</span>
              <div>
                <p className="font-semibold text-foreground">Distinctions</p>
                <p className="text-sm text-muted-foreground">2x gagnant concours d'éloquence IUT</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-accent mr-3 text-xl">💼</span>
              <div>
                <p className="font-semibold text-foreground">Cherche</p>
                <p className="text-sm text-muted-foreground">Stage: 24 jan - 8-10 semaines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
