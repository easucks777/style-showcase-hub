import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { StyleTheme } from "@/data/styles";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface StyleCardProps {
  theme: StyleTheme;
}

export const StyleCard = ({ theme }: StyleCardProps) => {
  const navigate = useNavigate();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} скопировано!`);
  };

  const copyAllColors = () => {
    const colorsText = `
Primary: ${theme.colors.primary}
Secondary: ${theme.colors.secondary}
Accent: ${theme.colors.accent}
Background: ${theme.colors.background}
Text: ${theme.colors.text}
    `.trim();
    copyToClipboard(colorsText, "Все цвета");
  };

  const copyAllFonts = () => {
    const fontsText = `
<!-- Add to HTML head -->
<link rel="stylesheet" href="${theme.fonts.heading.import}">
<link rel="stylesheet" href="${theme.fonts.body.import}">

/* Add to CSS */
h1, h2, h3, h4, h5, h6 {
  font-family: ${theme.fonts.heading.family};
}

body, p {
  font-family: ${theme.fonts.body.family};
}
    `.trim();
    copyToClipboard(fontsText, "Все шрифты");
  };

  return (
    <Card className="overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 group">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{theme.name}</h3>
          <p className="text-sm text-muted-foreground">{theme.description}</p>
        </div>

        {/* Color Palette */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">Цвета</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAllColors}
              className="h-7 text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Копировать все
            </Button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(theme.colors).map(([key, value]) => (
              <div
                key={key}
                className="group/color cursor-pointer"
                onClick={() => copyToClipboard(value, key)}
              >
                <div
                  className="h-16 rounded-lg border-2 border-border hover:border-primary transition-colors"
                  style={{ backgroundColor: value }}
                />
                <p className="text-xs text-center mt-1 text-muted-foreground group-hover/color:text-foreground capitalize">
                  {key}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Preview */}
        {theme.gradient && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Градиент</h4>
            <div
              className="h-16 rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors"
              style={{ background: theme.gradient }}
              onClick={() => copyToClipboard(theme.gradient!, "Градиент")}
            />
          </div>
        )}

        {/* Fonts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">Шрифты</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAllFonts}
              className="h-7 text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Копировать все
            </Button>
          </div>
          <div className="space-y-2">
            <div
              className="p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={() => copyToClipboard(theme.fonts.heading.import, "Заголовочный шрифт")}
            >
              <p className="text-xs text-muted-foreground mb-1">Заголовки</p>
              <p className="font-semibold text-foreground">{theme.fonts.heading.name}</p>
            </div>
            <div
              className="p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={() => copyToClipboard(theme.fonts.body.import, "Основной шрифт")}
            >
              <p className="text-xs text-muted-foreground mb-1">Текст</p>
              <p className="font-semibold text-foreground">{theme.fonts.body.name}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className="w-full"
          onClick={() => navigate(`/preview/${theme.id}`)}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Посмотреть пример
        </Button>
      </div>
    </Card>
  );
};
