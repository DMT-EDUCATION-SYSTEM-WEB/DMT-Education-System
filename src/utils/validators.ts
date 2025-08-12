// Validation utility functions for DMT Education System
export const validators = {
  // Email validation
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Phone number validation (Vietnamese format)
  isValidPhoneNumber: (phone: string): boolean => {
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    const cleaned = phone.replace(/\s+/g, '');
    return phoneRegex.test(cleaned);
  },

  // Password validation
  isValidPassword: (password: string): {
    isValid: boolean;
    errors: string[];
  } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Mật khẩu phải có ít nhất 8 ký tự');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất 1 chữ cái viết hoa');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất 1 chữ cái viết thường');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất 1 số');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Student ID validation
  isValidStudentId: (studentId: string): boolean => {
    // Format: DMT + 6 digits (e.g., DMT123456)
    const studentIdRegex = /^DMT\d{6}$/;
    return studentIdRegex.test(studentId.toUpperCase());
  },

  // Teacher ID validation
  isValidTeacherId: (teacherId: string): boolean => {
    // Format: GV + 4 digits (e.g., GV1234)
    const teacherIdRegex = /^GV\d{4}$/;
    return teacherIdRegex.test(teacherId.toUpperCase());
  },

  // Class code validation
  isValidClassCode: (classCode: string): boolean => {
    // Format: Subject code + Grade + Class (e.g., TOAN12A1, HOA11B2)
    const classCodeRegex = /^[A-Z]{2,4}\d{1,2}[A-Z]\d{1,2}$/;
    return classCodeRegex.test(classCode.toUpperCase());
  },

  // Grade validation
  isValidGrade: (grade: number, maxGrade = 10): boolean => {
    return grade >= 0 && grade <= maxGrade;
  },

  // Date validation
  isValidDate: (date: string | Date): boolean => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj instanceof Date && !isNaN(dateObj.getTime());
  },

  isValidDateRange: (startDate: string | Date, endDate: string | Date): boolean => {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
    
    return validators.isValidDate(start) && 
           validators.isValidDate(end) && 
           start <= end;
  },

  // Text validation
  isNotEmpty: (text: string): boolean => {
    return text.trim().length > 0;
  },

  hasMinLength: (text: string, minLength: number): boolean => {
    return text.length >= minLength;
  },

  hasMaxLength: (text: string, maxLength: number): boolean => {
    return text.length <= maxLength;
  },

  // Time validation
  isValidTimeFormat: (time: string): boolean => {
    // Format: HH:MM (e.g., 08:30, 14:45)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  },

  isValidTimeRange: (startTime: string, endTime: string): boolean => {
    if (!validators.isValidTimeFormat(startTime) || !validators.isValidTimeFormat(endTime)) {
      return false;
    }
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    
    return endMinutes > startMinutes;
  },

  // Form validation helpers
  validateRequired: (value: any, fieldName: string): string | null => {
    if (value === null || value === undefined || value === '') {
      return `${fieldName} là bắt buộc`;
    }
    return null;
  },

  validateEmail: (email: string): string | null => {
    if (!validators.isValidEmail(email)) {
      return 'Email không hợp lệ';
    }
    return null;
  },

  validatePhone: (phone: string): string | null => {
    if (!validators.isValidPhoneNumber(phone)) {
      return 'Số điện thoại không hợp lệ';
    }
    return null;
  }
};

// Legacy exports for backward compatibility
export const validateEmail = validators.isValidEmail;
export const validatePassword = (password: string): boolean => {
  return validators.isValidPassword(password).isValid;
};
export const validateRequired = (value: string): boolean => {
  return validators.isNotEmpty(value);
};
export const validatePhoneNumber = validators.isValidPhoneNumber;
export const validateDate = validators.isValidDate;

export default validators;