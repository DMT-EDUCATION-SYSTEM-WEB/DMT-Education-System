// Constants for DMT Education App
// Task 3: Extract constants from inline styles and magic values

export const COLORS = {
  // Primary Brand Colors
  primary: {
    main: '#dc2626',      // Red primary
    light: '#f43f5e',     // Pink accent
    dark: '#b91c1c',      // Dark red
    gradient: 'linear-gradient(135deg, #dc2626, #f43f5e)'
  },
  
  // Secondary Colors
  secondary: {
    blue: '#3b82f6',
    green: '#10b981',
    orange: '#f97316',
    purple: '#8b5cf6',
    yellow: '#f59e0b'
  },
  
  // Neutral Colors
  neutral: {
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827'
  },
  
  // Background Gradients
  backgrounds: {
    main: 'linear-gradient(135deg, #fef2f2 0%, #fce7f3 50%, #f3e8ff 100%)',
    header: 'rgba(255, 255, 255, 0.95)',
    card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
    footer: '#111827',
    announcement: 'linear-gradient(90deg, #fecaca, #fde68a)'
  },
  
  // Status Colors
  status: {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  }
};

export const TYPOGRAPHY = {
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  },
  
  fontSize: {
    xs: '12px',      // Small text
    sm: '13px',      // Secondary text
    base: '14px',    // Body text
    md: '15px',      // Nav links
    lg: '16px',      // Button text
    xl: '18px',      // Large body text
    '2xl': '20px',   // Section subtitles
    '3xl': '24px',   // Logo text
    '4xl': '32px',   // Section titles
    '5xl': '42px',   // Main headings
    '6xl': '52px'    // Hero title
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },
  
  lineHeight: {
    tight: '1.1',
    normal: '1.2',
    relaxed: '1.4',
    loose: '1.5',
    spacious: '1.6',
    extra: '1.7'
  }
};

export const SPACING = {
  // Padding & Margin
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '15px',
  xl: '20px',
  '2xl': '25px',
  '3xl': '30px',
  '4xl': '40px',
  '5xl': '50px',
  '6xl': '60px',
  '8xl': '80px',
  
  // Component specific spacing
  header: {
    height: '70px',
    padding: '0 1rem'
  },
  
  section: {
    padding: '80px 1rem',
    hero: '60px 1rem'
  },
  
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  
  gaps: {
    xs: '8px',
    sm: '12px',
    md: '15px',
    lg: '20px',
    xl: '30px',
    '2xl': '40px',
    '3xl': '60px'
  }
};

export const BORDERS = {
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '15px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    full: '50%',
    pill: '25px'   // For buttons
  },
  
  width: {
    thin: '1px',
    normal: '2px',
    thick: '3px'
  }
};

export const SHADOWS = {
  // Box shadows
  sm: '0 4px 15px rgba(0, 0, 0, 0.1)',
  md: '0 4px 20px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 25px rgba(220, 38, 38, 0.3)',
  xl: '0 10px 30px rgba(0, 0, 0, 0.1)',
  '2xl': '0 15px 35px rgba(220, 38, 38, 0.1)',
  '3xl': '0 20px 40px rgba(0, 0, 0, 0.1)',
  
  // Colored shadows
  primary: '0 4px 15px rgba(220, 38, 38, 0.3)',
  secondary: '0 8px 20px rgba(59, 130, 246, 0.3)',
  success: '0 8px 20px rgba(34, 197, 94, 0.3)'
};

export const EFFECTS = {
  // Backdrop filters
  blur: {
    sm: 'blur(10px)',
    md: 'blur(15px)',
    lg: 'blur(20px)'
  },
  
  // Transitions
  transition: {
    fast: 'all 0.2s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease'
  },
  
  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    popover: 50,
    tooltip: 60
  }
};

export const LAYOUT = {
  // Grid configurations
  grid: {
    hero: 'repeat(2, 1fr)',
    features: 'repeat(4, 1fr)',
    courses: 'repeat(3, 1fr)',
    footer: 'repeat(4, 1fr)'
  },
  
  // Flexbox configurations
  flex: {
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    between: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    start: {
      display: 'flex',
      alignItems: 'center'
    }
  }
};

export const CONTENT = {
  // Website URLs and links
  links: {
    facebook: 'https://facebook.com/dmteducation',
    youtube: 'https://youtube.com/@dmteducation',
    tiktok: 'https://tiktok.com/@dmteducation'
  },
  
  // Contact information
  contact: {
    phone: '077 230 5566',
    email: 'example@dmteducation.vn'
  },
  
  // Company information
  company: {
    name: 'DMT Education',
    tagline: 'Vững nguồn tri thức, tiếp bước tương lai',
    established: '2009',
    experience: '15+'
  },
  
  // Statistics
  stats: {
    students: '5,000+',
    passRate: '98%',
    awards: '150+',
    experience: '15+'
  }
};

export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px'
};

// Animation delays for staggered effects
export const ANIMATIONS = {
  delays: {
    fast: 100,
    normal: 200,
    slow: 300,
    slower: 400,
    slowest: 500
  },
  
  stagger: {
    item1: 100,
    item2: 200,
    item3: 300,
    item4: 400,
    item5: 500,
    item6: 600
  }
};
