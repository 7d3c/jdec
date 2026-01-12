"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

// Particle component for animated background
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const particleCount = 80;
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction - particles move away from cursor
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          particle.x -= (dx / dist) * force * 2;
          particle.y -= (dy / dist) * force * 2;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 0, 15, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((other) => {
          const distance = Math.sqrt(
            (particle.x - other.x) ** 2 + (particle.y - other.y) ** 2
          );
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(225, 0, 15, ${0.1 * (1 - distance / 120)})`;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
    />
  );
}

// Custom cursor component
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    const animate = () => {
      // Smooth follow for dot
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      dot.style.left = `${dotX - 4}px`;
      dot.style.top = `${dotY - 4}px`;

      // Slower follow for ring
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.left = `${ringX - 20}px`;
      ring.style.top = `${ringY - 20}px`;

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div
        ref={ringRef}
        className={`cursor-ring hidden md:block ${isHovering ? "hover" : ""}`}
      />
    </>
  );
}

// 3D Tilt card component
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlowPosition({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(225, 0, 15, 0.3) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

// Scroll reveal hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .accent-line-animated").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

// Magnetic button component
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

function MagneticButton({ children, className = "", href }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState("translate(0, 0)");

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setTransform(`translate(${x * 0.3}px, ${y * 0.3}px)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("translate(0, 0)");
  }, []);

  return (
    <a
      ref={buttonRef}
      href={href}
      className={`magnetic-btn inline-block ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}

// Animated counter
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useScrollReveal();

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] noise-overlay">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Fixed Social Sidebar */}
      <div className="fixed left-6 bottom-0 z-40 hidden md:flex flex-col items-center gap-6">
        <a
          href="https://www.linkedin.com/in/decieux/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#e1000f] transition-all duration-300 hover:-translate-y-1"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a
          href="mailto:jens@decieux.de"
          className="text-gray-500 hover:text-[#e1000f] transition-all duration-300 hover:-translate-y-1"
          aria-label="Email"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
        <div className="w-px h-24 bg-gray-700" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50
            ? "glass py-4 shadow-lg shadow-black/20"
            : "py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight group">
            <span className="text-white group-hover:text-shimmer transition-all duration-300">
              DÉCIEUX
            </span>
            <span className="text-[#e1000f] group-hover:animate-pulse">.</span>
          </Link>
          <div className="flex gap-8 text-sm">
            {["Über mich", "Expertise", "Kontakt"].map((item, i) => (
              <a
                key={item}
                href={`#${item === "Über mich" ? "about" : item.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e1000f] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Particle Background */}
        <ParticleField />

        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image
            src="/images/frankfurt-skyline-2.jpeg"
            alt="Frankfurt Skyline"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[600px] h-[600px] rounded-full animate-float opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(225, 0, 15, 0.4) 0%, transparent 70%)",
              top: "10%",
              left: "-10%",
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full animate-float-delayed opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(225, 0, 15, 0.3) 0%, transparent 70%)",
              bottom: "20%",
              right: "-5%",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#e1000f] text-sm font-semibold tracking-[0.3em] uppercase mb-6">
              Rechtsanwalt • Frankfurt am Main
            </p>
          </div>

          <h1 className={`transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 glitch-hover">
              Jens Décieux
            </span>
          </h1>

          <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-400 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              Mein Herz schlägt für{" "}
              <span className="text-[#e1000f] font-semibold">Legal Tech</span>,
              klare Lösungen und pragmatische{" "}
              <span className="text-[#e1000f] font-semibold">KI im Recht</span>.
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <MagneticButton
              href="#contact"
              className="px-8 py-4 bg-[#e1000f] text-white font-semibold rounded-lg hover:bg-[#b8000c] transition-all duration-300 glow-red-hover"
            >
              Kontakt aufnehmen
            </MagneticButton>
            <MagneticButton
              href="#about"
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Mehr erfahren
            </MagneticButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#e1000f] rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="accent-line-animated mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal">
                Recht trifft
                <br />
                <span className="gradient-text">Technologie</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 reveal" style={{ animationDelay: "0.1s" }}>
                Als Rechtsanwalt in Frankfurt am Main verbinde ich traditionelle
                juristische Expertise mit modernen technologischen Lösungen. Mein
                Fokus liegt auf der praktischen Anwendung von Legal Tech und
                künstlicher Intelligenz im Rechtsbereich.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed reveal" style={{ animationDelay: "0.2s" }}>
                Ich glaube daran, dass die Digitalisierung das Rechtswesen
                effizienter, zugänglicher und transparenter machen kann – ohne
                dabei die menschliche Komponente zu verlieren.
              </p>
            </div>
            <div className="relative reveal-right">
              <TiltCard className="aspect-square rounded-2xl overflow-hidden glass p-1">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/frankfurt.jpeg"
                    alt="Frankfurt am Main"
                    fill
                    className="object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white/80 text-sm font-medium">
                      Frankfurt am Main
                    </p>
                  </div>
                </div>
              </TiltCard>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#e1000f]/20 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-[#e1000f]/10 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center stagger-children">
            {[
              { value: 20, suffix: "+", label: "Jahre Erfahrung" },
              { value: 50, suffix: "+", label: "Legal Tech Projekte" },
              { value: 100, suffix: "%", label: "Leidenschaft" },
            ].map((stat, i) => (
              <div key={i} className="reveal-scale">
                <div className="text-4xl md:text-5xl font-bold text-[#e1000f] mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-32 px-6 bg-[#0d0d0d] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e1000f] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#e1000f] rounded-full blur-[150px]" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="accent-line-animated mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4 reveal">
              Meine Expertise
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto reveal" style={{ animationDelay: "0.1s" }}>
              Spezialisiert auf die Schnittstelle zwischen Recht und Technologie
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {/* Card 1 */}
            <TiltCard className="reveal-scale">
              <div className="glass rounded-2xl p-8 h-full spotlight relative overflow-hidden">
                <div className="w-14 h-14 rounded-xl bg-[#e1000f]/10 flex items-center justify-center mb-6 group-hover:glow-red transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-[#e1000f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Legal Tech</h3>
                <p className="text-gray-400 leading-relaxed">
                  Implementierung und Beratung zu digitalen Lösungen für
                  Kanzleien und Rechtsabteilungen. Von Dokumentenautomation bis
                  Contract Lifecycle Management.
                </p>
              </div>
            </TiltCard>

            {/* Card 2 */}
            <TiltCard className="reveal-scale">
              <div className="glass rounded-2xl p-8 h-full spotlight relative overflow-hidden">
                <div className="w-14 h-14 rounded-xl bg-[#e1000f]/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-[#e1000f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">KI im Recht</h3>
                <p className="text-gray-400 leading-relaxed">
                  Pragmatischer Einsatz von künstlicher Intelligenz in der
                  Rechtsberatung. Chancen nutzen, Risiken verstehen, Compliance
                  sicherstellen.
                </p>
              </div>
            </TiltCard>

            {/* Card 3 */}
            <TiltCard className="reveal-scale">
              <div className="glass rounded-2xl p-8 h-full spotlight relative overflow-hidden">
                <div className="w-14 h-14 rounded-xl bg-[#e1000f]/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-[#e1000f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Klare Lösungen</h3>
                <p className="text-gray-400 leading-relaxed">
                  Komplexe rechtliche Fragestellungen verständlich aufbereitet.
                  Pragmatische Ansätze statt theoretischer Abhandlungen.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Frankfurt Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/frankfurt-skyline-3.jpeg"
            alt="Frankfurt"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <div className="accent-line-animated mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal-left">
              Verwurzelt in
              <br />
              <span className="text-[#e1000f]">Frankfurt</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 reveal-left" style={{ animationDelay: "0.1s" }}>
              Frankfurt am Main – Finanzmetropole, Kulturstadt und meine
              Heimat. Hier, wo Tradition auf Innovation trifft, verbinde ich
              als Rechtsanwalt klassische juristische Werte mit dem Geist
              einer Stadt, die nie stillsteht.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed reveal-left" style={{ animationDelay: "0.2s" }}>
              Und ja, mein Herz schlägt auch für die{" "}
              <span className="text-[#e1000f] font-semibold">Eintracht</span> –
              Leidenschaft, Zusammenhalt und der Glaube daran, dass man auch
              als vermeintlicher Underdog Großes erreichen kann.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-[#0d0d0d] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient-bg opacity-30" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="accent-line-animated mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal">
            Lassen Sie uns sprechen
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto reveal" style={{ animationDelay: "0.1s" }}>
            Sie haben ein Projekt, eine Frage oder möchten sich über Legal Tech
            austauschen? Ich freue mich auf Ihre Nachricht.
          </p>

          <div className="reveal-scale" style={{ animationDelay: "0.2s" }}>
            <MagneticButton
              href="mailto:jens@decieux.de"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#e1000f] text-white font-semibold rounded-lg hover:bg-[#b8000c] transition-all duration-300 glow-red-hover text-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              jens@decieux.de
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-xl font-bold mb-1 group">
                <span className="text-white">DÉCIEUX</span>
                <span className="text-[#e1000f]">.</span>
              </p>
              <p className="text-gray-500 text-sm">
                Rechtsanwalt • Frankfurt am Main
              </p>
            </div>

            <div className="flex gap-8 text-sm">
              <Link
                href="/impressum"
                className="text-gray-400 hover:text-white transition-colors relative group"
              >
                Impressum
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e1000f] transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/datenschutz"
                className="text-gray-400 hover:text-white transition-colors relative group"
              >
                Datenschutz
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e1000f] transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/decieux/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#e1000f] transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} Jens Décieux
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
