import { useParams, useNavigate } from "react-router-dom";
import { styleThemes } from "@/data/styles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Moon, Sun, Code } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const StylePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = styleThemes.find((t) => t.id === id);
  const [isDark, setIsDark] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const currentColors = (isDark && theme?.darkColors) ? theme.darkColors : theme?.colors;
  const currentGradient = (isDark && theme?.darkGradient) ? theme.darkGradient : theme?.gradient;

  useEffect(() => {
    if (!theme) return;

    const headingLink = document.createElement("link");
    headingLink.rel = "stylesheet";
    headingLink.href = theme.fonts.heading.import;
    document.head.appendChild(headingLink);

    const bodyLink = document.createElement("link");
    bodyLink.rel = "stylesheet";
    bodyLink.href = theme.fonts.body.import;
    document.head.appendChild(bodyLink);

    return () => {
      document.head.removeChild(headingLink);
      document.head.removeChild(bodyLink);
    };
  }, [theme]);

  if (!theme || !currentColors) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Стиль не найден</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к каталогу
          </Button>
        </div>
      </div>
    );
  }

  const copyCode = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`${label} скопирован!`);
  };

  const getAnimationCode = () => {
    const animations = {
      gaming: `/* Gaming Animations */
@keyframes glitch {
  0%, 100% { transform: translate(0); opacity: 1; }
  20% { transform: translate(-1px, 1px); opacity: 0.95; }
  40% { transform: translate(1px, -1px); opacity: 0.95; }
}

@keyframes matrix-rain {
  0% { transform: translateY(-100%); opacity: 0; }
  10%, 90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

@keyframes neon-pulse {
  0%, 100% { box-shadow: 0 0 5px currentColor, 0 0 10px currentColor; }
  50% { box-shadow: 0 0 10px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; }
}

.gaming-glitch { animation: glitch 2s ease-in-out infinite; }
.gaming-neon { animation: neon-pulse 2s ease-in-out infinite; }
.gaming-scanline::before { animation: scanline 3s linear infinite; }`,
      corporate: `/* Corporate Animations */
@keyframes slide-up-fade {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes card-flip {
  0% { transform: perspective(1000px) rotateY(0deg); }
  50% { transform: perspective(1000px) rotateY(180deg); }
  100% { transform: perspective(1000px) rotateY(360deg); }
}

@keyframes parallax-float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-10px) translateX(5px); }
  50% { transform: translateY(-5px) translateX(-5px); }
  75% { transform: translateY(-15px) translateX(3px); }
}

.corporate-slide { animation: slide-up-fade 0.8s ease-out forwards; }
.corporate-flip { animation: card-flip 6s ease-in-out infinite; }
.corporate-parallax { animation: parallax-float 8s ease-in-out infinite; }`,
      creative: `/* Creative Animations */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes blob-morph {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg) scale(1); }
  25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(90deg) scale(1.1); }
  50% { border-radius: 50% 50% 30% 70% / 30% 50% 70% 50%; transform: rotate(180deg) scale(0.9); }
  75% { border-radius: 70% 30% 50% 50% / 60% 40% 60% 40%; transform: rotate(270deg) scale(1.05); }
}

@keyframes color-wave {
  0% { filter: hue-rotate(0deg) brightness(1); }
  50% { filter: hue-rotate(180deg) brightness(0.9); }
  100% { filter: hue-rotate(360deg) brightness(1); }
}

.creative-gradient { animation: gradient-shift 8s ease infinite; }
.creative-blob { animation: blob-morph 10s ease-in-out infinite; }
.creative-wave { animation: color-wave 6s ease-in-out infinite; }`,
      minimalist: `/* Minimalist Animations */
@keyframes minimal-fade {
  from { opacity: 0; letter-spacing: 10px; }
  to { opacity: 1; letter-spacing: normal; }
}

@keyframes geometric-reveal {
  0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
  100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
}

@keyframes line-expand {
  0% { width: 0; opacity: 0; }
  100% { width: 100%; opacity: 1; }
}

.minimalist-fade { animation: minimal-fade 1.2s ease-out forwards; }
.minimalist-reveal { animation: geometric-reveal 1.5s ease-out forwards; }
.minimalist-line { animation: line-expand 2s ease-out forwards; }`,
      vintage: `/* Vintage Animations */
@keyframes vintage-glow {
  0%, 100% { text-shadow: 0 0 10px rgba(218, 165, 32, 0.5); }
  50% { text-shadow: 0 0 20px rgba(218, 165, 32, 0.8), 0 0 30px rgba(210, 105, 30, 0.6); }
}

@keyframes film-grain {
  0%, 100% { background-position: 0% 0%; opacity: 0.05; }
  50% { background-position: 100% 100%; opacity: 0.1; }
}

@keyframes retro-flicker {
  0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(218, 165, 32, 0.5); }
  5% { opacity: 0.9; }
  10% { opacity: 1; text-shadow: 0 0 15px rgba(218, 165, 32, 0.7); }
}

.vintage-glow { animation: vintage-glow 2s ease-in-out infinite; }
.vintage-grain::before { animation: film-grain 1s steps(10) infinite; }
.vintage-flicker { animation: retro-flicker 5s ease-in-out infinite; }`,
      tech: `/* Tech Animations */
@keyframes tech-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); transform: scale(1); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); transform: scale(1.02); }
}

@keyframes hologram-glitch {
  0%, 100% { transform: translateZ(0) scale(1); opacity: 1; }
  20% { transform: translateZ(10px) scale(1.02); opacity: 0.9; }
  40% { transform: translateZ(-10px) scale(0.98); opacity: 0.95; }
}

@keyframes data-stream {
  0% { transform: translateX(-100%); opacity: 0; }
  10%, 90% { opacity: 1; }
  100% { transform: translateX(200%); opacity: 0; }
}

.tech-pulse { animation: tech-pulse 3s ease-in-out infinite; }
.tech-hologram { animation: hologram-glitch 3s ease-in-out infinite; }
.tech-stream::after { animation: data-stream 5s linear infinite; }`
    };
    return animations[theme.id as keyof typeof animations] || '';
  };

  const renderExampleSite = () => {
    const textColor = currentColors.text;
    const bgColor = currentColors.background;
    const primaryColor = currentColors.primary;
    const secondaryColor = currentColors.secondary;
    const accentColor = currentColors.accent;

    switch (theme.id) {
      case 'gaming':
        return (
          <div style={{ background: currentGradient, minHeight: '80vh', padding: '4rem 2rem' }}>
            <div className="container mx-auto">
              <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontFamily: theme.fonts.heading.family, color: textColor, fontSize: '1.5rem', fontWeight: 'bold' }} className="gaming-glitch">
                  GAME_TITLE
                </h2>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {['ИГРАТЬ', 'МАГАЗИН', 'ЛИГА'].map((item) => (
                    <a key={item} href="#" style={{ fontFamily: theme.fonts.body.family, color: accentColor, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px' }}>
                      {item}
                    </a>
                  ))}
                </div>
              </nav>
              
              <div style={{ textAlign: 'center', marginTop: '6rem' }} className="gaming-matrix gaming-scanline">
                <h1 style={{ fontFamily: theme.fonts.heading.family, color: textColor, fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem' }} className="gaming-glitch">
                  НОВЫЙ УРОВЕНЬ ИГРЫ
                </h1>
                <p style={{ fontFamily: theme.fonts.body.family, color: accentColor, fontSize: '1.5rem', marginBottom: '3rem', textTransform: 'uppercase' }} className="gaming-neon">
                  Присоединяйся к миллионам игроков
                </p>
                <button className="gaming-button-hover gaming-neon" style={{
                  backgroundColor: accentColor,
                  color: '#000',
                  padding: '1rem 3rem',
                  fontSize: '1.25rem',
                  fontFamily: theme.fonts.body.family,
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  boxShadow: `0 0 20px ${accentColor}`
                }}>
                  НАЧАТЬ СЕЙЧАС
                </button>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '5rem', maxWidth: '900px', margin: '5rem auto 0' }}>
                  {['СКОРОСТЬ', 'МОЩЬ', 'ПОБЕДА'].map((text, i) => (
                    <div key={i} className="gaming-neon" style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      border: `2px solid ${accentColor}`,
                      padding: '2rem 1rem',
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}>
                      <div style={{ fontFamily: theme.fonts.heading.family, color: accentColor, fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {i + 1}
                      </div>
                      <div style={{ fontFamily: theme.fonts.body.family, color: textColor, fontSize: '1rem', textTransform: 'uppercase' }}>
                        {text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'corporate':
        return (
          <div style={{ backgroundColor: bgColor, minHeight: '80vh', padding: '2rem' }}>
            <div className="container mx-auto">
              <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', borderBottom: `1px solid ${secondaryColor}` }}>
                <h2 style={{ fontFamily: theme.fonts.heading.family, color: primaryColor, fontSize: '1.75rem', fontWeight: 'bold' }}>
                  Company
                </h2>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  {['Услуги', 'О нас', 'Контакты'].map((item) => (
                    <a key={item} href="#" style={{ fontFamily: theme.fonts.body.family, color: textColor, fontWeight: '500' }} className="corporate-slide">
                      {item}
                    </a>
                  ))}
                </div>
              </nav>
              
              <div style={{ marginTop: '6rem', maxWidth: '800px' }}>
                <h1 style={{ fontFamily: theme.fonts.heading.family, color: textColor, fontSize: '3.5rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '2rem' }} className="corporate-slide">
                  Инновационные решения для вашего бизнеса
                </h1>
                <p style={{ fontFamily: theme.fonts.body.family, color: textColor, fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.8 }} className="corporate-slide">
                  Мы помогаем компаниям достигать своих целей с помощью передовых технологий и профессионального подхода.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }} className="corporate-slide">
                  <button className="corporate-button-hover" style={{
                    backgroundColor: primaryColor,
                    color: isDark ? textColor : '#fff',
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontFamily: theme.fonts.body.family,
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}>
                    Узнать больше
                  </button>
                  <button className="corporate-button-hover" style={{
                    backgroundColor: 'transparent',
                    color: textColor,
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontFamily: theme.fonts.body.family,
                    fontWeight: '600',
                    border: `2px solid ${primaryColor}`,
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}>
                    Связаться
                  </button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '5rem' }}>
                  {['Стратегия', 'Развитие', 'Результат'].map((text, i) => (
                    <div key={i} className="corporate-parallax corporate-flip" style={{
                      backgroundColor: secondaryColor,
                      padding: '3rem 2rem',
                      borderRadius: '1rem',
                      textAlign: 'center',
                      border: `1px solid ${primaryColor}20`
                    }}>
                      <div style={{ fontFamily: theme.fonts.heading.family, color: primaryColor, fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        0{i + 1}
                      </div>
                      <div style={{ fontFamily: theme.fonts.body.family, color: textColor, fontSize: '1.1rem' }}>
                        {text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'creative':
        return (
          <div style={{ backgroundColor: bgColor, minHeight: '80vh', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: currentGradient, opacity: 0.1 }} className="creative-wave"></div>
            <div className="container mx-auto" style={{ position: 'relative' }}>
              <h1 style={{ fontFamily: theme.fonts.heading.family, fontSize: '5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }} className="creative-gradient creative-bounce">
                ТВОРЧЕСТВО БЕЗ ГРАНИЦ
              </h1>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
                {[primaryColor, secondaryColor, accentColor].map((color, i) => (
                  <div key={i} className="creative-button-hover creative-blob" style={{
                    backgroundColor: color,
                    padding: '3rem 2rem',
                    borderRadius: '1.5rem',
                    textAlign: 'center',
                    transform: 'rotate(-2deg)',
                    cursor: 'pointer'
                  }}>
                    <h3 style={{ fontFamily: theme.fonts.heading.family, color: isDark ? textColor : '#fff', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                      Проект {i + 1}
                    </h3>
                    <p style={{ fontFamily: theme.fonts.body.family, color: isDark ? textColor : '#fff', opacity: 0.9 }}>
                      Уникальный креативный проект
                    </p>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '5rem', textAlign: 'center' }}>
                <p style={{ fontFamily: theme.fonts.body.family, color: textColor, fontSize: '1.5rem', marginBottom: '2rem' }} className="creative-wave">
                  Создавайте. Вдохновляйтесь. Развивайтесь.
                </p>
              </div>
            </div>
          </div>
        );

      case 'minimalist':
        return (
          <div style={{ backgroundColor: bgColor, minHeight: '80vh', padding: '4rem 2rem' }}>
            <div className="container mx-auto" style={{ maxWidth: '900px' }}>
              <h1 style={{ fontFamily: theme.fonts.heading.family, color: textColor, fontSize: '4rem', fontWeight: 'bold', marginBottom: '4rem', letterSpacing: '-2px' }} className="minimalist-fade">
                Простота — это сложность
              </h1>
              
              <div style={{ borderLeft: `4px solid ${primaryColor}`, paddingLeft: '2rem', marginBottom: '4rem' }} className="minimalist-line">
                <p style={{ fontFamily: theme.fonts.body.family, color: textColor, fontSize: '1.5rem', lineHeight: '2', opacity: 0.8 }} className="minimalist-reveal">
                  Минимализм — это не об отсутствии, а о сути. Каждый элемент имеет значение.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1px', marginTop: '4rem' }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="minimalist-button-hover minimalist-shift" style={{
                    flex: 1,
                    height: `${100 + i * 50}px`,
                    backgroundColor: i % 2 === 0 ? primaryColor : accentColor,
                    cursor: 'pointer'
                  }}></div>
                ))}
              </div>
              
              <div style={{ marginTop: '5rem', textAlign: 'center' }}>
                <div style={{ height: '2px', backgroundColor: primaryColor, marginBottom: '3rem' }} className="minimalist-line"></div>
                <p style={{ fontFamily: theme.fonts.body.family, color: textColor, fontSize: '1.25rem', opacity: 0.7 }} className="minimalist-fade">
                  Меньше значит больше
                </p>
              </div>
            </div>
          </div>
        );

        case 'vintage':
        return (
          <div style={{ backgroundColor: bgColor, minHeight: '80vh', padding: '4rem 2rem', backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} className="vintage-grain">
            <div className="container mx-auto" style={{ maxWidth: '1000px' }}>
              <div style={{ textAlign: 'center', borderTop: `3px solid ${primaryColor}`, borderBottom: `3px solid ${primaryColor}`, padding: '3rem 0', marginBottom: '4rem' }}>
                <h1 style={{ fontFamily: theme.fonts.heading.family, color: primaryColor, fontSize: '4.5rem', fontWeight: '900', marginBottom: '1rem' }} className="vintage-glow vintage-flicker">
                  VINTAGE GALLERY
                </h1>
                <p style={{ fontFamily: theme.fonts.body.family, color: secondaryColor, fontSize: '1.25rem', fontStyle: 'italic' }} className="vintage-sepia">
                  Классика никогда не выходит из моды
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem' }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="vintage-button-hover vintage-sepia" style={{
                    border: `8px solid ${secondaryColor}`,
                    padding: '2rem',
                    backgroundColor: isDark ? '#000' : '#fff',
                    boxShadow: '10px 10px 0 rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}>
                    <h3 style={{ fontFamily: theme.fonts.heading.family, color: textColor, fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }} className="vintage-flicker">
                      Коллекция {i}
                    </h3>
                    <p style={{ fontFamily: theme.fonts.body.family, color: textColor, opacity: 0.8 }}>
                      Изысканные винтажные элементы из прошлого века
                    </p>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '5rem', textAlign: 'center', borderTop: `2px solid ${secondaryColor}`, paddingTop: '3rem' }}>
                <p style={{ fontFamily: theme.fonts.body.family, color: primaryColor, fontSize: '1.5rem', fontWeight: 'bold' }} className="vintage-glow">
                  Элегантность сквозь время
                </p>
              </div>
            </div>
          </div>
        );

      case 'tech':
        return (
          <div style={{ backgroundColor: bgColor, minHeight: '80vh', padding: '4rem 2rem', position: 'relative' }} className="tech-circuit">
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: currentGradient, opacity: 0.05 }} className="tech-scan"></div>
            <div className="tech-pulse" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}></div>
            <div className="container mx-auto" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
                <div style={{ width: '4px', height: '60px', backgroundColor: primaryColor }}></div>
                <h1 style={{ fontFamily: theme.fonts.heading.family, color: textColor, fontSize: '3.5rem', fontWeight: 'bold', letterSpacing: '2px' }} className="tech-hologram">
                  TECH_FUTURE
                </h1>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '4rem' }}>
                {['AI', 'CLOUD', 'SECURITY'].map((item) => (
                  <div key={item} className="tech-button-hover tech-stream" style={{
                    backgroundColor: secondaryColor,
                    padding: '3rem 2rem',
                    border: `1px solid ${accentColor}`,
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '2px', backgroundColor: accentColor }} className="tech-scan"></div>
                    <h3 style={{ fontFamily: theme.fonts.heading.family, color: primaryColor, fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }} className="tech-hologram">
                      {item}
                    </h3>
                    <p style={{ fontFamily: theme.fonts.body.family, color: textColor, opacity: 0.8 }}>
                      Передовые технологии будущего
                    </p>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '5rem', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '1rem 3rem', border: `2px solid ${primaryColor}`, position: 'relative', overflow: 'hidden' }} className="tech-stream">
                  <p style={{ fontFamily: theme.fonts.heading.family, color: primaryColor, fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '3px' }}>
                    CONNECTING THE FUTURE
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const cssCode = `/* ${theme.name} Style - CSS */
:root {
  --primary: ${currentColors.primary};
  --secondary: ${currentColors.secondary};
  --accent: ${currentColors.accent};
  --background: ${currentColors.background};
  --text: ${currentColors.text};
  --font-heading: ${theme.fonts.heading.family};
  --font-body: ${theme.fonts.body.family};
  --gradient: ${currentGradient};
}

h1, h2, h3 {
  font-family: var(--font-heading);
  color: var(--text);
}

body, p {
  font-family: var(--font-body);
  color: var(--text);
  background-color: var(--background);
}

${getAnimationCode()}`;

  return (
    <div style={{ backgroundColor: currentColors.background, minHeight: "100vh" }}>
      <nav style={{ borderBottom: `1px solid ${currentColors.secondary}`, padding: "1rem", backgroundColor: currentColors.secondary }}>
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            style={{ color: currentColors.text }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            К каталогу
          </Button>
          <h2 style={{ 
            fontFamily: theme.fonts.heading.family, 
            color: currentColors.text,
            fontSize: "1.5rem",
            fontWeight: "bold"
          }}>
            {theme.name}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCode(!showCode)}
              style={{ color: currentColors.text }}
            >
              <Code className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              style={{ color: currentColors.text }}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {renderExampleSite()}

      {showCode && (
        <div className="container mx-auto px-4 py-12">
          <div style={{ 
            backgroundColor: currentColors.secondary, 
            padding: "2rem",
            borderRadius: "1rem",
            border: `2px solid ${currentColors.accent}`
          }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ 
                fontFamily: theme.fonts.heading.family, 
                color: currentColors.text,
                fontSize: "1.5rem",
                fontWeight: "bold"
              }}>
                CSS Код + Анимации
              </h3>
              <Button
                onClick={() => copyCode(cssCode, "CSS код")}
                style={{
                  backgroundColor: currentColors.accent,
                  color: isDark ? '#000' : '#fff'
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Копировать
              </Button>
            </div>
            <pre style={{
              fontFamily: "monospace",
              color: currentColors.text,
              fontSize: "0.875rem",
              overflow: "auto",
              whiteSpace: "pre-wrap"
            }}>
              {cssCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default StylePreview;