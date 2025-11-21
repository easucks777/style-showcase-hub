import { useParams, useNavigate } from "react-router-dom";
import { styleThemes } from "@/data/styles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const StylePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = styleThemes.find((t) => t.id === id);
  const [isDark, setIsDark] = useState(false);

  // Use dark colors if available and isDark is true
  const currentColors = (isDark && theme?.darkColors) ? theme.darkColors : theme?.colors;
  const currentGradient = (isDark && theme?.darkGradient) ? theme.darkGradient : theme?.gradient;

  useEffect(() => {
    if (!theme) return;

    // Load fonts dynamically
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

  const cssCode = `
/* ${theme.name} Style - CSS Variables */
:root {
  --primary: ${currentColors.primary};
  --secondary: ${currentColors.secondary};
  --accent: ${currentColors.accent};
  --background: ${currentColors.background};
  --text: ${currentColors.text};
  --font-heading: ${theme.fonts.heading.family};
  --font-body: ${theme.fonts.body.family};
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: var(--text);
}

body, p {
  font-family: var(--font-body);
  color: var(--text);
  background-color: var(--background);
}

/* Buttons */
.btn-primary {
  background-color: var(--primary);
  color: ${['#fafafa', '#f1f5f9', '#e0e7ff', '#ffffff', '#f5f5dc'].includes(currentColors.text) ? '#000000' : '#ffffff'};
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
  `.trim();

  const htmlCode = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${theme.name} Style Example</title>
  
  <!-- Fonts -->
  <link rel="stylesheet" href="${theme.fonts.heading.import}">
  <link rel="stylesheet" href="${theme.fonts.body.import}">
  
  <!-- Custom CSS -->
  <style>
    ${cssCode}
  </style>
</head>
<body>
  <div class="container">
    <h1>Добро пожаловать</h1>
    <p>Пример страницы в стиле ${theme.name}</p>
    <button class="btn-primary">Кнопка</button>
  </div>
</body>
</html>
  `.trim();

  return (
    <div style={{ backgroundColor: currentColors.background, minHeight: "100vh" }}>
      {/* Navigation */}
      <nav style={{ borderBottom: `1px solid ${currentColors.secondary}`, padding: "1rem" }}>
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            style={{ color: currentColors.text }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к каталогу
          </Button>
          <div className="flex items-center gap-4">
            {(theme.darkColors || theme.darkGradient) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                style={{ color: currentColors.text }}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            <h2 style={{ 
              fontFamily: theme.fonts.heading.family, 
              color: currentColors.text,
              fontSize: "1.5rem",
              fontWeight: "bold"
            }}>
              {theme.name}
            </h2>
          </div>
        </div>
      </nav>

      {/* Preview Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-16">
          <h1 
            style={{ 
              fontFamily: theme.fonts.heading.family, 
              color: currentColors.text,
              fontSize: "3.5rem",
              fontWeight: "bold",
              lineHeight: "1.2"
            }}
          >
            Пример Страницы
          </h1>
          <p 
            style={{ 
              fontFamily: theme.fonts.body.family, 
              color: currentColors.secondary,
              fontSize: "1.25rem",
              maxWidth: "42rem",
              margin: "0 auto"
            }}
          >
            Это демонстрация стиля {theme.name} с использованием всех цветов и шрифтов
          </p>
          <div className="flex gap-4 justify-center">
            <button
              style={{
                backgroundColor: currentColors.primary,
                color: ['#fafafa', '#f1f5f9', '#e0e7ff', '#ffffff', '#f5f5dc'].includes(currentColors.text) ? '#000000' : '#ffffff',
                padding: "0.75rem 2rem",
                borderRadius: "0.5rem",
                fontFamily: theme.fonts.body.family,
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
            >
              Главная кнопка
            </button>
            <button
              style={{
                backgroundColor: currentColors.secondary,
                color: ['#fafafa', '#f1f5f9', '#e0e7ff', '#ffffff', '#f5f5dc'].includes(currentColors.text) ? '#ffffff' : currentColors.text,
                padding: "0.75rem 2rem",
                borderRadius: "0.5rem",
                fontFamily: theme.fonts.body.family,
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
            >
              Второстепенная
            </button>
          </div>
        </section>

        {/* Content Sections */}
        <section className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                backgroundColor: currentColors.secondary,
                padding: "1.5rem",
                borderRadius: "0.75rem",
                border: `2px solid ${currentColors.accent}`
              }}
            >
              <h3 
                style={{ 
                  fontFamily: theme.fonts.heading.family, 
                  color: currentColors.text,
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "0.75rem"
                }}
              >
                Заголовок {i}
              </h3>
              <p 
                style={{ 
                  fontFamily: theme.fonts.body.family, 
                  color: currentColors.text,
                  opacity: 0.8
                }}
              >
                Пример текстового контента с использованием основного шрифта. Демонстрация читаемости и стиля.
              </p>
            </div>
          ))}
        </section>

        {/* Code Examples */}
        <section className="space-y-6">
          <h2 
            style={{ 
              fontFamily: theme.fonts.heading.family, 
              color: currentColors.text,
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            Код для использования
          </h2>

          {/* CSS Code */}
          <div style={{ 
            backgroundColor: currentColors.secondary, 
            padding: "1.5rem",
            borderRadius: "0.75rem",
            position: "relative"
          }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ 
                fontFamily: theme.fonts.heading.family, 
                color: currentColors.text,
                fontSize: "1.25rem",
                fontWeight: "600"
              }}>
                CSS
              </h3>
              <Button
                size="sm"
                onClick={() => copyCode(cssCode, "CSS код")}
                style={{
                  backgroundColor: currentColors.accent,
                  color: ['#fafafa', '#f1f5f9', '#e0e7ff', '#ffffff', '#f5f5dc'].includes(currentColors.text) ? '#000000' : '#ffffff'
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Копировать
              </Button>
            </div>
            <pre style={{
              fontFamily: "monospace",
              color: currentColors.text,
              opacity: 0.9,
              fontSize: "0.875rem",
              overflow: "auto",
              whiteSpace: "pre-wrap"
            }}>
              {cssCode}
            </pre>
          </div>

          {/* HTML Code */}
          <div style={{ 
            backgroundColor: currentColors.secondary, 
            padding: "1.5rem",
            borderRadius: "0.75rem",
            position: "relative"
          }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ 
                fontFamily: theme.fonts.heading.family, 
                color: currentColors.text,
                fontSize: "1.25rem",
                fontWeight: "600"
              }}>
                HTML
              </h3>
              <Button
                size="sm"
                onClick={() => copyCode(htmlCode, "HTML код")}
                style={{
                  backgroundColor: currentColors.accent,
                  color: ['#fafafa', '#f1f5f9', '#e0e7ff', '#ffffff', '#f5f5dc'].includes(currentColors.text) ? '#000000' : '#ffffff'
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Копировать
              </Button>
            </div>
            <pre style={{
              fontFamily: "monospace",
              color: currentColors.text,
              opacity: 0.9,
              fontSize: "0.875rem",
              overflow: "auto",
              whiteSpace: "pre-wrap"
            }}>
              {htmlCode}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StylePreview;
