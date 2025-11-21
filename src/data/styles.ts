export interface StyleTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: {
      name: string;
      family: string;
      import: string;
    };
    body: {
      name: string;
      family: string;
      import: string;
    };
  };
  gradient?: string;
}

export const styleThemes: StyleTheme[] = [
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Темный стиль с неоновыми акцентами для игровых проектов',
    colors: {
      primary: '#000000',
      secondary: '#1a1a1a',
      accent: '#00ff88',
      background: '#0a0a0a',
      text: '#ffffff',
    },
    fonts: {
      heading: {
        name: 'Orbitron',
        family: "'Orbitron', sans-serif",
        import: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap",
      },
      body: {
        name: 'Rajdhani',
        family: "'Rajdhani', sans-serif",
        import: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;600&display=swap",
      },
    },
    gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Профессиональный стиль для бизнес-проектов',
    colors: {
      primary: '#1e3a8a',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      background: '#f8fafc',
      text: '#1e293b',
    },
    fonts: {
      heading: {
        name: 'Poppins',
        family: "'Poppins', sans-serif",
        import: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap",
      },
      body: {
        name: 'Inter',
        family: "'Inter', sans-serif",
        import: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap",
      },
    },
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Яркий креативный стиль для творческих проектов',
    colors: {
      primary: '#ec4899',
      secondary: '#f59e0b',
      accent: '#8b5cf6',
      background: '#ffffff',
      text: '#18181b',
    },
    fonts: {
      heading: {
        name: 'Fredoka',
        family: "'Fredoka', sans-serif",
        import: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap",
      },
      body: {
        name: 'Nunito',
        family: "'Nunito', sans-serif",
        import: "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap",
      },
    },
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #8b5cf6 100%)',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Минималистичный черно-белый стиль',
    colors: {
      primary: '#000000',
      secondary: '#404040',
      accent: '#737373',
      background: '#ffffff',
      text: '#171717',
    },
    fonts: {
      heading: {
        name: 'Montserrat',
        family: "'Montserrat', sans-serif",
        import: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap",
      },
      body: {
        name: 'Lato',
        family: "'Lato', sans-serif",
        import: "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
      },
    },
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Ретро стиль с теплыми винтажными цветами',
    colors: {
      primary: '#8b4513',
      secondary: '#d2691e',
      accent: '#daa520',
      background: '#faf8f3',
      text: '#3e2723',
    },
    fonts: {
      heading: {
        name: 'Playfair Display',
        family: "'Playfair Display', serif",
        import: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap",
      },
      body: {
        name: 'Merriweather',
        family: "'Merriweather', serif",
        import: "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
      },
    },
    gradient: 'linear-gradient(135deg, #8b4513 0%, #daa520 100%)',
  },
];
