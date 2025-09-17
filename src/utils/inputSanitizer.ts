// Input sanitization and validation utilities
export interface ValidationRule {
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  required?: boolean;
}

export interface SanitizeOptions {
  maxLength?: number;
  allowHtml?: boolean;
  trimWhitespace?: boolean;
}

// Sanitize user input to prevent XSS and other injection attacks
export const sanitizeInput = (
  input: string, 
  options: SanitizeOptions = {}
): string => {
  const {
    maxLength = 10000,
    allowHtml = false,
    trimWhitespace = true
  } = options;

  if (!input) return '';

  let sanitized = input;

  // Trim whitespace if enabled
  if (trimWhitespace) {
    sanitized = sanitized.trim();
  }

  // Remove HTML tags if not allowed
  if (!allowHtml) {
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  }

  // Remove potential script injections
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  sanitized = sanitized.replace(/data:text\/html/gi, '');

  // Encode special characters for PDF safety
  sanitized = sanitized.replace(/[<>&"']/g, (match) => {
    const entities: { [key: string]: string } = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#x27;'
    };
    return entities[match] || match;
  });

  // Truncate to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};

// Validate input against rules
export const validateInput = (
  input: string, 
  rules: ValidationRule = {}
): { isValid: boolean; error?: string } => {
  const { maxLength, minLength, pattern, required } = rules;

  // Check if required
  if (required && (!input || input.trim().length === 0)) {
    return { isValid: false, error: 'Este campo es requerido' };
  }

  // Skip other validations if not required and empty
  if (!required && (!input || input.trim().length === 0)) {
    return { isValid: true };
  }

  // Check minimum length
  if (minLength && input.length < minLength) {
    return { 
      isValid: false, 
      error: `Debe tener al menos ${minLength} caracteres` 
    };
  }

  // Check maximum length
  if (maxLength && input.length > maxLength) {
    return { 
      isValid: false, 
      error: `No puede exceder ${maxLength} caracteres` 
    };
  }

  // Check pattern
  if (pattern && !pattern.test(input)) {
    return { 
      isValid: false, 
      error: 'Formato inválido' 
    };
  }

  return { isValid: true };
};

// Sanitize object with multiple fields
export const sanitizeFormData = <T extends Record<string, any>>(
  data: T,
  options: SanitizeOptions = {}
): T => {
  const sanitized = { ...data } as any;
  
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key], options);
    } else if (Array.isArray(sanitized[key])) {
      sanitized[key] = sanitized[key].map((item: any) => 
        typeof item === 'string' ? sanitizeInput(item, options) : item
      );
    }
  });

  return sanitized as T;
};

// Common validation rules
export const ValidationRules = {
  company: { required: true, maxLength: 200, minLength: 2 },
  industry: { required: true, maxLength: 100, minLength: 2 },
  description: { required: true, maxLength: 2000, minLength: 10 },
  shortText: { required: true, maxLength: 500, minLength: 3 },
  longText: { required: true, maxLength: 5000, minLength: 10 },
  name: { required: true, maxLength: 100, minLength: 2 },
  email: { 
    required: false, 
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
} as const;