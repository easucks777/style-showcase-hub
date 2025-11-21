import { useParams, useNavigate } from "react-router-dom";
import { styleThemes } from "@/data/styles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

const StylePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = styleThemes.find((t) => t.id === id);

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

  if (!theme) {
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
  --primary: ${theme.colors.primary};
  --secondary: ${theme.colors.secondary};
  --accent: ${theme.colors.accent};
  --background: ${theme.colors.background};
  --text: ${theme.colors.text};
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
  color: ${theme.colors.text === '#171717' || theme.colors.text === '#3e2723' ? '#ffffff' : 'var(--text)'};
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
    <div style={{ backgroundColor: theme.colors.background, minHeight: "100vh" }}>
      {/* Navigation */}
      <nav style={{ borderBottom: `1px solid ${theme.colors.secondary}`, padding: "1rem" }}>
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            style={{ color: theme.colors.text }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к каталогу
          </Button>
          <h2 style={{ 
            fontFamily: theme.fonts.heading.family, 
            color: theme.colors.text,
            fontSize: "1.5rem",
            fontWeight: "bold"
          }}>
            {theme.name}
          </h2>
        </div>
      </nav>

      {/* Preview Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-16">
          <h1 
            style={{ 
              fontFamily: theme.fonts.heading.family, 
              color: theme.colors.text,
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
              color: theme.colors.secondary,
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
                backgroundColor: theme.colors.primary,
                color: theme.colors.text === '#171717' || theme.colors.text === '#3e2723' ? '#ffffff' : theme.colors.background,
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
                backgroundColor: theme.colors.secondary,
                color: theme.colors.text,
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
                backgroundColor: theme.colors.secondary,
                padding: "1.5rem",
                borderRadius: "0.75rem",
                border: `2px solid ${theme.colors.accent}`
              }}
            >
              <h3 
                style={{ 
                  fontFamily: theme.fonts.heading.family, 
                  color: theme.colors.text,
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
                  color: theme.colors.text,
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
              color: theme.colors.text,
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            Код для использования
          </h2>

          {/* CSS Code */}
          <div style={{ 
            backgroundColor: theme.colors.secondary, 
            padding: "1.5rem",
            borderRadius: "0.75rem",
            position: "relative"
          }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ 
                fontFamily: theme.fonts.heading.family, 
                color: theme.colors.text,
                fontSize: "1.25rem",
                fontWeight: "600"
              }}>
                CSS
              </h3>
              <Button
                size="sm"
                onClick={() => copyCode(cssCode, "CSS код")}
                style={{
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.text === '#171717' || theme.colors.text === '#3e2723' ? '#ffffff' : theme.colors.background
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Копировать
              </Button>
            </div>
            <pre style={{
              fontFamily: "monospace",
              color: theme.colors.text,
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
            backgroundColor: theme.colors.secondary, 
            padding: "1.5rem",
            borderRadius: "0.75rem",
            position: "relative"
          }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ 
                fontFamily: theme.fonts.heading.family, 
                color: theme.colors.text,
                fontSize: "1.25rem",
                fontWeight: "600"
              }}>
                HTML
              </h3>
              <Button
                size="sm"
                onClick={() => copyCode(htmlCode, "HTML код")}
                style={{
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.text === '#171717' || theme.colors.text === '#3e2723' ? '#ffffff' : theme.colors.background
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Копировать
              </Button>
            </div>
            <pre style={{
              fontFamily: "monospace",
              color: theme.colors.text,
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
