// Helper utility functions for DMT Education System
export const helpers = {
  // Array helpers
  groupBy: <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const group = (item[key] as unknown as string);
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  sortBy: <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  },

  unique: <T>(array: T[], key?: keyof T): T[] => {
    if (!key) {
      return [...new Set(array)];
    }
    
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  },

  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // Object helpers
  pick: <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  omit: <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  },

  deepClone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
    if (obj instanceof Array) return obj.map(item => helpers.deepClone(item)) as unknown as T;
    if (typeof obj === 'object') {
      const cloned = {} as { [key: string]: any };
      Object.keys(obj).forEach(key => {
        cloned[key] = helpers.deepClone((obj as any)[key]);
      });
      return cloned as T;
    }
    return obj;
  },

  isEmpty: (value: any): boolean => {
    if (value == null) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  },

  // String helpers
  generateId: (prefix = '', length = 8): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = prefix;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  generateSlug: (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s_-]+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  },

  generateStudentId: (): string => {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `DMT${year}${random}`;
  },

  generateClassCode: (subject: string, grade: number, section: string): string => {
    const subjectCode = subject.toUpperCase().substring(0, 4);
    return `${subjectCode}${grade}${section.toUpperCase()}`;
  },

  // Date helpers
  formatDateRange: (startDate: Date | string, endDate: Date | string): string => {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
    
    const startDay = start.getDate();
    const startMonth = start.getMonth() + 1;
    const startYear = start.getFullYear();
    
    const endDay = end.getDate();
    const endMonth = end.getMonth() + 1;
    const endYear = end.getFullYear();
    
    if (startYear === endYear && startMonth === endMonth) {
      return `${startDay}-${endDay}/${startMonth}/${startYear}`;
    }
    
    if (startYear === endYear) {
      return `${startDay}/${startMonth} - ${endDay}/${endMonth}/${startYear}`;
    }
    
    return `${startDay}/${startMonth}/${startYear} - ${endDay}/${endMonth}/${endYear}`;
  },

  getWeeksInMonth: (year: number, month: number): number => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstWeek = Math.ceil(firstDay.getDate() / 7);
    const lastWeek = Math.ceil(lastDay.getDate() / 7);
    return lastWeek - firstWeek + 1;
  },

  isWeekend: (date: Date | string): boolean => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const day = dateObj.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  },

  addDays: (date: Date | string, days: number): Date => {
    const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj;
  },

  // Number helpers
  calculateGPA: (grades: number[]): number => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    return Math.round((sum / grades.length) * 100) / 100;
  },

  calculatePercentage: (value: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100 * 100) / 100;
  },

  randomInRange: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Academic helpers
  getGradeLevel: (score: number, maxScore = 10): string => {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  },

  calculateAttendanceRate: (present: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((present / total) * 100 * 100) / 100;
  },

  getAcademicYear: (date?: Date): string => {
    const currentDate = date || new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Academic year starts in September (month 8, 0-indexed)
    if (currentMonth >= 8) {
      return `${currentYear}-${currentYear + 1}`;
    } else {
      return `${currentYear - 1}-${currentYear}`;
    }
  },

  getSemester: (date?: Date): 1 | 2 => {
    const currentDate = date || new Date();
    const currentMonth = currentDate.getMonth();
    
    // Semester 1: September-January (months 8-0)
    // Semester 2: February-August (months 1-7)
    if (currentMonth >= 8 || currentMonth <= 0) {
      return 1;
    } else {
      return 2;
    }
  },

  // Storage helpers
  setLocalStorage: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  getLocalStorage: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return defaultValue;
    }
  },

  removeLocalStorage: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  },

  setSessionStorage: (key: string, value: any): void => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to sessionStorage:', error);
    }
  },

  getSessionStorage: <T>(key: string, defaultValue: T): T => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to read from sessionStorage:', error);
      return defaultValue;
    }
  },

  // URL helpers
  getQueryParams: (): Record<string, string> => {
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  },

  setQueryParams: (params: Record<string, string>): void => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    window.history.pushState({}, '', url.toString());
  },

  // Device helpers
  isMobile: (): boolean => {
    return window.innerWidth <= 768;
  },

  isTablet: (): boolean => {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  },

  isDesktop: (): boolean => {
    return window.innerWidth > 1024;
  },

  // Performance helpers
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Color helpers
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  rgbToHex: (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  // Error handling helpers
  safeExecute: <T>(fn: () => T, fallback: T): T => {
    try {
      return fn();
    } catch (error) {
      console.warn('Safe execution failed:', error);
      return fallback;
    }
  },

  retry: async <T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
  ): Promise<T> => {
    let lastError: Error;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }
};

export default helpers;
