// Utility functions for formatting data - DMT Education System
export const formatters = {
  // Number formatting
  formatNumber: (num: number, decimals = 0): string => {
    return new Intl.NumberFormat('vi-VN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  },

  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  },

  formatPercent: (value: number, decimals = 1): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  },

  // Date formatting
  formatDate: (date: Date | string, format: 'short' | 'long' | 'full' = 'short'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const options: Record<string, Intl.DateTimeFormatOptions> = {
      short: { day: '2-digit', month: '2-digit', year: 'numeric' },
      long: { day: 'numeric', month: 'long', year: 'numeric' },
      full: { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }
    };

    return new Intl.DateTimeFormat('vi-VN', options[format]).format(dateObj);
  },

  formatTime: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(dateObj);
  },

  formatDateTime: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(dateObj);
  },

  formatRelativeTime: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) return 'vừa xong';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    
    return formatters.formatDate(dateObj);
  },

  // Text formatting
  truncateText: (text: string, maxLength: number, suffix = '...'): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - suffix.length) + suffix;
  },

  capitalizeWords: (text: string): string => {
    return text.replace(/\b\w/g, l => l.toUpperCase());
  },

  slugify: (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  formatFullName: (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`.trim();
  },

  // Phone number formatting
  formatPhoneNumber: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
      return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    
    return phone; // Return original if format not recognized
  },

  // File size formatting
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Grade formatting
  formatGrade: (score: number, maxScore = 10): string => {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) return 'Xuất sắc';
    if (percentage >= 80) return 'Giỏi';
    if (percentage >= 70) return 'Khá';
    if (percentage >= 60) return 'Trung bình khá';
    if (percentage >= 50) return 'Trung bình';
    return 'Yếu';
  },

  // Course duration formatting
  formatDuration: (minutes: number): string => {
    if (minutes < 60) return `${minutes} phút`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) return `${hours} giờ`;
    return `${hours} giờ ${remainingMinutes} phút`;
  },

  // Student count formatting
  formatStudentCount: (count: number): string => {
    if (count === 0) return 'Chưa có học sinh';
    if (count === 1) return '1 học sinh';
    return `${formatters.formatNumber(count)} học sinh`;
  },

  // Class code formatting
  formatClassCode: (code: string): string => {
    return code.toUpperCase().replace(/\s+/g, '');
  }
};

// Legacy exports for backward compatibility
export const formatDate = formatters.formatDate;
export const formatCurrency = formatters.formatCurrency;
export const formatPercentage = formatters.formatPercent;
export const truncateText = formatters.truncateText;
export const formatFullName = formatters.formatFullName;

export default formatters;