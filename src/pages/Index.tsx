import { styleThemes } from "@/data/styles";
import { StyleCard } from "@/components/StyleCard";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Каталог Дизайн-Стилей</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Готовые стили для ваших проектов
            </h1>
            <p className="text-xl text-muted-foreground">
              Выбирайте готовые цветовые схемы и шрифты. Копируйте коды одним кликом.
            </p>
          </div>
        </div>
      </div>

      {/* Styles Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {styleThemes.map((theme) => (
            <StyleCard key={theme.id} theme={theme} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground text-sm">
            Создано для дизайнеров и разработчиков
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
