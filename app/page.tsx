"use client"

import type React from "react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [hackText, setHackText] = useState("LANDRY KAPGNEP")
  const [isHacking, setIsHacking] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [heroContentOpacity, setHeroContentOpacity] = useState(1) // Declare heroContentOpacity variable

  useEffect(() => {
    startHackEffect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 500)
      setHeroContentOpacity(Math.min(1, Math.max(0, 1 - window.scrollY / 800))) // Update heroContentOpacity based on scrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const startHackEffect = () => {
    if (isHacking) return
    setIsHacking(true)

    const originalText = "LANDRY KAPGNEP"
    const chars = "01!@#$%^&*(){}[]<>?/\\|~`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let iterations = 0

    const interval = setInterval(() => {
      setHackText(
        originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iterations) {
              return originalText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join(""),
      )

      iterations += 0.15

      if (iterations >= originalText.length) {
        clearInterval(interval)
        setHackText(originalText)
        setIsHacking(false)
      }
    }, 60)
  }

  const resetText = () => {
    if (!isHacking) {
      setHackText("LANDRY KAPGNEP")
    }
  }

  const heroHeight = typeof window !== "undefined" ? window.innerHeight : 800
  const scrollProgress = Math.min(scrollY / heroHeight, 1)

  const imageScale = Math.max(0.65, 1 - scrollProgress * 0.35)

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  const imageTranslateY = 0
  const imageTranslateX = isMobile ? -scrollProgress * 30 : 0

  const aboutMeProgress = Math.max(0, Math.min(1, (scrollY - heroHeight * 0.5) / (heroHeight * 0.3)))

  const navOpacity = scrollY > 100 ? 0.4 : 1

  const contactSection = typeof document !== "undefined" ? document.querySelector("#contact") : null
  const contactSectionTop = contactSection?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY
  const isInContactSection = contactSectionTop <= 100

  const navTextColor = isInContactSection ? "text-white" : "text-foreground"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <main className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-black hover:bg-gray-800"} text-white p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* Hero Section with sticky container */}
      <div id="home" className="relative" style={{ height: "150vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="grid lg:grid-cols-2 h-full">
            <div className="flex items-center justify-center p-6 md:p-8 lg:p-16 relative">
              <div
                className="relative w-full max-w-lg aspect-[3/4] transition-all duration-300 ease-out hover:scale-105 group px-4"
                style={{
                  transform: `scale(${imageScale}) translateX(${imageTranslateX}%)`,
                  transformOrigin: "center center",
                }}
              >
                <img
                  src="/images/photo-20landry-20kapgnep.jpg"
                  alt="Landry Kapgnep"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 md:p-8 lg:p-16 relative">
              <nav
                className="fixed top-4 md:top-8 right-4 md:right-8 lg:right-16 flex flex-col items-end gap-1 md:gap-4 z-[9999] transition-all duration-500 pointer-events-auto"
                style={{ opacity: navOpacity }}
              >
                <Link
                  href="#home"
                  onClick={(e) => handleNavClick(e, "#home")}
                  className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Accueil
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? "bg-white" : "bg-foreground"} transition-all duration-300 group-hover/link:w-full`}
                  ></span>
                </Link>
                <Link
                  href="#about"
                  onClick={(e) => handleNavClick(e, "#about")}
                  className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  À Propos
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? "bg-white" : "bg-foreground"} transition-all duration-300 group-hover/link:w-full`}
                  ></span>
                </Link>
                <Link
                  href="#skills"
                  onClick={(e) => handleNavClick(e, "#skills")}
                  className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Compétences
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? "bg-white" : "bg-foreground"} transition-all duration-300 group-hover/link:w-full`}
                  ></span>
                </Link>
                <Link
                  href="#projects"
                  onClick={(e) => handleNavClick(e, "#projects")}
                  className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Projets
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? "bg-white" : "bg-foreground"} transition-all duration-300 group-hover/link:w-full`}
                  ></span>
                </Link>
                <Link
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Contact
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? "bg-white" : "bg-foreground"} transition-all duration-300 group-hover/link:w-full`}
                  ></span>
                </Link>
                <button
                  onClick={toggleDarkMode}
                  className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all mt-6 pointer-events-auto flex items-center gap-2`}
                  aria-label="Basculer le mode sombre"
                >
                  {isDarkMode ? <>☀️</> : <>🌙</>}
                </button>
              </nav>

              <div
                className="flex-1 flex flex-col justify-center transition-opacity duration-300 pt-24 md:pt-40 lg:pt-48"
                style={{ opacity: heroContentOpacity }}
              >
                <h1
                  className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold ${isDarkMode ? "text-white" : "text-foreground"} mb-3 md:mb-6 cursor-pointer font-mono glitch-container group/name`}
                  onMouseEnter={startHackEffect}
                  onMouseLeave={resetText}
                >
                  <span className="glitch-text" data-text={hackText}>
                    {hackText}
                  </span>
                </h1>

                <div className="space-y-1 md:space-y-2 mb-6 md:mb-12">
                  <p className={`text-base md:text-xl ${isDarkMode ? "text-gray-300" : "text-muted-foreground"}`}>
                    Développeur & Créatif
                  </p>
                  <p
                    className={`text-sm md:text-lg font-semibold ${isDarkMode ? "text-gray-300" : "text-muted-foreground"}`}
                  >
                    Étudiant BUT 2 Informatique
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4 group cursor-pointer">
                  <div className="flex items-center gap-3 md:gap-4">
                    <h2
                      className={`text-xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-foreground"} transition-transform duration-300 group-hover:scale-110 origin-left`}
                    >
                      Collaborons ensemble
                    </h2>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${isDarkMode ? "text-white" : "text-foreground"} md:w-6 md:h-6 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2`}
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                  <div
                    className={`h-1 w-20 md:w-32 ${isDarkMode ? "bg-white" : "bg-foreground"} transition-all duration-500 ease-out group-hover:w-32 md:group-hover:w-48`}
                  ></div>
                </div>
              </div>

              <div id="about"></div>
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-16 transition-all duration-1000 ease-out ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
                style={{
                  opacity: aboutMeProgress,
                  transform: `translateY(${(1 - aboutMeProgress) * 50}px)`,
                  pointerEvents: aboutMeProgress > 0.5 ? "auto" : "none",
                }}
              >
                <div className="space-y-2 md:space-y-6">
                  <h2
                    className={`text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold ${isDarkMode ? "text-white" : "text-black"} leading-tight`}
                  >
                    LANDRY KAPGNEP
                  </h2>
                  <p
                    className={`text-xs md:text-base lg:text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}
                  >
                    Étudiant en BUT 2 Informatique passionné par la création d'expériences numériques engageantes et
                    toujours impatient d'apprendre de nouvelles technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <section
        id="skills"
        className={`min-h-screen ${isDarkMode ? "bg-gray-800" : "bg-white"} py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="transition-all duration-700"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 600) / 200)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 600) / 10)}px)`,
            }}
          >
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-12 md:mb-16 lg:mb-20`}
            >
              Compétences & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Programmation",
                  skills: ["Java", "Python", "C", "JavaScript"],
                },
                {
                  title: "Développement Web",
                  skills: ["HTML/CSS/SCSS", "React.js", "Fastify", "PHP", "JWT", "Django"],
                },
                {
                  title: "Bases de Données",
                  skills: ["SQL", "PostgreSQL", "MariaDB", "MongoDB"],
                },
                {
                  title: "Systèmes & Outils",
                  skills: ["Linux", "Windows", "Bash", "Git", "GitHub", "GitLab"],
                },
                {
                  title: "Compétences Créatives",
                  skills: ["Blender 3D", "Adobe Photoshop", "Adobe Premiere Pro"],
                },
                {
                  title: "Spécialisées",
                  skills: ["Godot Engine", "Unity", "Requests", "BeautifulSoup", "PyAutoGUI"],
                },
              ].map((category, idx) => (
                <div
                  key={idx}
                  className={`space-y-4 p-6 border ${isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-white"} rounded-lg hover:shadow-lg transition-all duration-300`}
                  style={{
                    opacity: Math.min(1, Math.max(0, (scrollY - 700 - idx * 100) / 200)),
                    transform: `translateY(${Math.max(0, 40 - (scrollY - 700 - idx * 100) / 10)}px)`,
                  }}
                >
                  <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${isDarkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700"}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"} py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16`}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-12 md:mb-16 lg:mb-20`}
          >
            Expérience
          </h2>
          <div className="space-y-8">
            {[
              {
                title: "Développeur Web",
                company: "Startup Twini",
                year: "2025",
                description: "Planification et conception, sélection des technologies et développement",
              },
              {
                title: "Recruteur - Acquisition de Donateurs",
                company: "Médecins sans Frontières",
                year: "2025",
                description: "Sensibilisation, création de relations et présentation orale",
              },
              {
                title: "Membre d'Équipe Polyvalent",
                company: "Jeux Olympiques Paris 2024",
                year: "2024",
                description: "Plonge, Rayonnage, Service, Encaissement, Cuisine, Accueil",
              },
              {
                title: "Designer Graphique",
                company: "Conseil Régional d'Ile de France",
                year: "2019",
                description: "Besoins clients, communication, créativité et gestion du temps",
              },
            ].map((job, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-lg border ${isDarkMode ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-white"} hover:shadow-lg transition-all duration-300`}
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollY - 1600 - idx * 100) / 200)),
                  transform: `translateY(${Math.max(0, 40 - (scrollY - 1600 - idx * 100) / 10)}px)`,
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{job.title}</h3>
                  <span className={`text-lg font-semibold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                    {job.year}
                  </span>
                </div>
                <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-3`}>{job.company}</p>
                <p className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`min-h-screen ${isDarkMode ? "bg-gray-800" : "bg-white"} py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16`}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-12 md:mb-16 lg:mb-20`}
          >
            Projets Universitaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Installation d'un poste pour le développement",
                period: "Sept - Déc 2022",
                description:
                  "Installation de Raspbian sur un RaspberryPi, déploiement d'un serveur apache2, gestion d'une base de données",
              },
              {
                title: "Comparaison d'approches algorithmique",
                period: "Sept - Déc 2022",
                description:
                  "Développement de fonctions en Python de chiffrement césar, codage à bit de parité simple et recherche dans un fichier Json",
              },
              {
                title: "Création d'un site internet pour un évènement culturel",
                period: "Sept 2022 - Jan 2023",
                description:
                  "Entretiens avec le client puis développement d'un site internet en accord avec les besoins du client",
              },
              {
                title: "Création d'un site internet de recensement de jeux de société",
                period: "Sept 2024 - Jan 2025",
                description: "Entretiens en groupe, choix du stack technologique et développement",
              },
              {
                title: "Installation de services réseaux",
                period: "Fév - Avr 2023",
                description:
                  "Déploiement d'un service réseau dans un environnement LAMP (Linux, Apache, MariaDB/Mysql, PHP)",
              },
              {
                title: "Création d'une base données",
                period: "Sept - Déc 2022",
                description: "Création et gestion d'une base de données à partir d'un fichier CSV sur PostgreSQL",
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className={`p-8 border rounded-lg hover:shadow-lg transition-all duration-300 ${isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-50"}`}
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollY - 2300 - idx * 80) / 200)),
                  transform: `translateY(${Math.max(0, 40 - (scrollY - 2300 - idx * 80) / 10)}px)`,
                }}
              >
                <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-2`}>
                  {project.title}
                </h3>
                <p className={`text-sm font-semibold ${isDarkMode ? "text-blue-400" : "text-blue-600"} mb-3`}>
                  {project.period}
                </p>
                <p className={`text-base ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Passions Section */}
      <section
        id="interests"
        className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"} py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16`}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-12 md:mb-16 lg:mb-20`}
          >
            Centres d'Intérêt
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Développement de Jeux",
                description: "Création d'expériences interactives avec Godot Engine et Unity",
                icon: "🎮",
              },
              {
                title: "Performances Oratoires",
                description: "2 fois gagnant du concours d'éloquence de l'IUT de Villetaneuse",
                icon: "🎤",
              },
              {
                title: "Art & Conception 3D",
                description: "Artiste 3D Freelance spécialisé en Blender",
                icon: "🎨",
              },
            ].map((interest, idx) => (
              <div
                key={idx}
                className={`p-8 border rounded-lg hover:shadow-lg transition-all duration-300 ${isDarkMode ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-gray-50"}`}
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollY - 3500 - idx * 100) / 200)),
                  transform: `translateY(${Math.max(0, 40 - (scrollY - 3500 - idx * 100) / 10)}px)`,
                }}
              >
                <div className="text-4xl mb-4">{interest.icon}</div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-3`}>
                  {interest.title}
                </h3>
                <p className={`text-base ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Languages */}
      <section
        id="education"
        className={`min-h-screen ${isDarkMode ? "bg-gray-800" : "bg-white"} py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-8`}
              >
                Formation
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Bachelor Universitaire de Technologie - AN 2",
                    school: "IUT de la Sorbonne Paris Nord",
                    year: "En cours",
                    description: "Spécialisation en Informatique",
                  },
                  {
                    title: "Baccalauréat Général + Cambridge Certificate (B2)",
                    school: "2022",
                    year: "2022",
                    description:
                      "Spécialité : Numérique et Sciences Informatiques, Sciences et Vie de la Terre, Maths Complémentaires",
                  },
                ].map((edu, idx) => (
                  <div
                    key={idx}
                    className={`p-6 border rounded-lg ${isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-50"}`}
                  >
                    <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-2`}>
                      {edu.title}
                    </h3>
                    <p className={`text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{edu.school}</p>
                    <p className={`text-sm ${isDarkMode ? "text-blue-400" : "text-blue-600"} font-semibold`}>
                      {edu.year}
                    </p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-700"} mt-2`}>
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-8`}
              >
                Langues
              </h2>
              <div className="space-y-4">
                {[
                  { language: "Anglais", level: "C1 (Cambridge Certificate)" },
                  { language: "Allemand", level: "Niveau Baccalauréat" },
                  { language: "Mandarin", level: "En apprentissage" },
                ].map((lang, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between items-center p-4 border rounded-lg ${isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-50"}`}
                  >
                    <span className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>{lang.language}</span>
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`min-h-screen ${isDarkMode ? "bg-black" : "bg-black"} py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
                Parlons Ensemble
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                N'hésitez pas à me contacter pour discuter de nouvelles opportunités, collaborations ou simplement pour
                me dire bonjour!
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <a
                    href="mailto:landrykapgnep01@gmail.com"
                    className="text-white text-lg hover:text-blue-400 transition-colors"
                  >
                    landrykapgnep01@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">GitHub</p>
                  <a
                    href="https://github.com/landry-kapgnep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-lg hover:text-blue-400 transition-colors"
                  >
                    github.com/landry-kapgnep
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/landry-kapgnep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-lg hover:text-blue-400 transition-colors"
                  >
                    linkedin.com/in/landry-kapgnep
                  </a>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} focus:outline-none focus:border-blue-500`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} focus:outline-none focus:border-blue-500`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"} focus:outline-none focus:border-blue-500`}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
