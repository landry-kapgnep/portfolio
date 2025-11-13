"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Linkedin, Github, MapPin } from "lucide-react"

export default function Contact() {
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

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "landrykapgnep01@gmail.com",
      href: "mailto:landrykapgnep01@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Landry Kapgnep",
      href: "https://www.linkedin.com/in/landry-kapgnep",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@landrykapgnep",
      href: "https://github.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Île-de-France, France",
      href: "#",
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 md:px-16 max-w-4xl ml-0 md:ml-64">
      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
          <span className="text-accent">Me</span> contacter
        </h2>

        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          Je suis toujours ouvert à discuter de projets intéressants, de collaborations ou simplement pour prendre un
          café. N'hésitez pas à me contacter !
        </p>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon
            return (
              <a
                key={idx}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group p-6 bg-card border border-border rounded-lg hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{method.label}</p>
                    <p className="text-foreground font-semibold group-hover:text-accent transition-colors duration-300">
                      {method.value}
                    </p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="p-8 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">À la recherche d'un stage</h3>
          <p className="text-muted-foreground mb-6">
            24 janvier - 8 à 10 semaines | Développement web | Île-de-France/Remote
          </p>
          <a
            href="mailto:landrykapgnep01@gmail.com"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Parlons de votre projet
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Landry Kapgnep. Conçu et développé avec ❤️ et ☕</p>
        </div>
      </div>
    </section>
  )
}
