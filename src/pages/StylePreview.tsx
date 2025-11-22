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
      gaming: `/* Gaming Glitch Animation */
@keyframes glitch {
  0%, 100% {
    transform: translate(0);
    clip-path: inset(0 0 0 0);
  }
  20% {
    transform: translate(-2px, 2px);
    clip-path: inset(10px 0 30px 0);
  }
  40% {
    transform: translate(2px, -2px);
    clip-path: inset(30px 0 10px 0);
  }
}

.gaming-glitch {
  animation: glitch 0.3s infinite;
  text-shadow: 2px 2px #00ff88, -2px -2px #00d4ff;
}`,
      corporate: `/* Corporate Slide Animation */
@keyframes slide-up-fade {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.corporate-slide {
  animation: slide-up-fade 0.8s ease-out forwards;
}`,
      creative: `/* Creative Gradient Animation */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.creative-gradient {
  background: linear-gradient(270deg, #ec4899, #f59e0b, #8b5cf6);
  background-size: 600% 600%;
  animation: gradient-shift 8s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`,
      minimalist: `/* Minimalist Fade Animation */
@keyframes minimal-fade {
  from {
    opacity: 0;
    letter-spacing: 10px;
  }
  to {
    opacity: 1;
    letter-spacing: normal;
  }
}

.minimalist-fade {
  animation: minimal-fade 1.2s ease-out forwards;
}`,
      vintage: `/* Vintage Glow Animation */
@keyframes vintage-glow {
  0%, 100% {
    text-shadow: 0 0 10px rgba(218, 165, 32, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(218, 165, 32, 0.8), 0 0 30px rgba(210, 105, 30, 0.6);
  }
}

.vintage-glow {
  animation: vintage-glow 2s ease-in-out infinite;
}`,
      tech: `/* Tech Scan & Pulse Animations */
@keyframes tech-scan {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes tech-pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.2);
    transform: scale(1.02);
  }
}

.tech-scan {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(59, 130, 246, 0.4) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: tech-scan 3s linear infinite;
}

.tech-pulse {
  animation: tech-pulse 3s ease-in-out infinite;
}`
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
              
              <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                <h1 style={{ fontFamily: theme.fonts.heading.family, color: textColor, fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem' }} className="gaming-glitch">
                  НОВЫЙ УРОВЕНЬ ИГРЫ
                </h1>
                <p style={{ fontFamily: theme.fonts.body.family, color: accentColor, fontSize: '1.5rem', marginBottom: '3rem', textTransform: 'uppercase' }}>
                  Присоединяйся к миллионам игроков
                </p>
                <button className="gaming-button-hover" style={{
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
              </div>
            </div>
          </div>
        );

      case 'creative':
        return (
          <div style={{ backgroundColor: bgColor, minHeight: '80vh', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: currentGradient, opacity: 0.1 }}></div>
            <div className="container mx-auto" style={{ position: 'relative' }}>
              <h1 style={{ fontFamily: theme.fonts.heading.family, fontSize: '5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }} className="creative-gradient">
                ТВОРЧЕСТВО БЕЗ ГРАНИЦ
              </h1>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
                {[primaryColor, secondaryColor, accentColor].map((color, i) => (
                  <div key={i} className="creative-button-hover" style={{
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
              
              <div style={{ borderLeft: `4px solid ${primaryColor}`, paddingLeft: '2rem', marginBottom: '4rem' }}>
                <p style={{ fontFamily: theme.fonts.body.family, color: textColor, fontSize: '1.5rem', lineHeight: '2', opacity: 0.8 }}>
                  Минимализм — это не об отсутствии, а о сути. Каждый элемент имеет значение.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1px', marginTop: '4rem' }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="minimalist-button-hover" style={{
                    flex: 1,
                    height: `${100 + i * 50}px`,
                    backgroundColor: i % 2 === 0 ? primaryColor : accentColor,
                    cursor: 'pointer'
                  }}></div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'vintage':
        return (
          <div style={{ backgroundColor: bgColor, minHeight: '80vh', padding: '4rem 2rem', backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            <div className="container mx-auto" style={{ maxWidth: '1000px' }}>
              <div style={{ textAlign: 'center', borderTop: `3px solid ${primaryColor}`, borderBottom: `3px solid ${primaryColor}`, padding: '3rem 0', marginBottom: '4rem' }}>
                <h1 style={{ fontFamily: theme.fonts.heading.family, color: primaryColor, fontSize: '4.5rem', fontWeight: '900', marginBottom: '1rem' }} className="vintage-glow">
                  VINTAGE GALLERY
                </h1>
                <p style={{ fontFamily: theme.fonts.body.family, color: secondaryColor, fontSize: '1.25rem', fontStyle: 'italic' }}>
                  Классика никогда не выходит из моды
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem' }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="vintage-button-hover" style={{
                    border: `8px solid ${secondaryColor}`,
                    padding: '2rem',
                    backgroundColor: isDark ? '#000' : '#fff',
                    boxShadow: '10px 10px 0 rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}>
                    <h3 style={{ fontFamily: theme.fonts.heading.family, color: textColor, fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                      Коллекция {i}
                    </h3>
                    <p style={{ fontFamily: theme.fonts.body.family, color: textColor, opacity: 0.8 }}>
                      Изысканные винтажные элементы из прошлого века
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'tech':
        return (
          <div style={{ backgroundColor: bgColor, minHeight: '80vh', padding: '4rem 2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: currentGradient, opacity: 0.05 }} className="tech-scan"></div>
            <div className="tech-pulse" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}></div>
            <div className="container mx-auto" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
                <div style={{ width: '4px', height: '60px', backgroundColor: primaryColor }}></div>
                <h1 style={{ fontFamily: theme.fonts.heading.family, color: textColor, fontSize: '3.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>
                  TECH_FUTURE
                </h1>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '4rem' }}>
                {['AI', 'CLOUD', 'SECURITY'].map((item) => (
                  <div key={item} className="tech-button-hover" style={{
                    backgroundColor: secondaryColor,
                    padding: '3rem 2rem',
                    border: `1px solid ${accentColor}`,
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '2px', backgroundColor: accentColor }} className="tech-scan"></div>
                    <h3 style={{ fontFamily: theme.fonts.heading.family, color: primaryColor, fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                      {item}
                    </h3>
                    <p style={{ fontFamily: theme.fonts.body.family, color: textColor, opacity: 0.8 }}>
                      Передовые технологии будущего
                    </p>
                  </div>
                ))}
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