// Utils barrel export - DMT Education System
import { formatters } from './formatters';
import { validators } from './validators';
import { animations } from './animations';
import { helpers } from './helpers';

export { formatters, default as formatters_default } from './formatters';
export { validators, default as validators_default } from './validators';
export { animations, default as animations_default } from './animations';
export { helpers, default as helpers_default } from './helpers';

// Legacy exports for backward compatibility
export {
  formatDate,
  formatCurrency,
  formatPercentage,
  truncateText,
  formatFullName
} from './formatters';

export {
  validateEmail,
  validatePassword,
  validateRequired,
  validatePhoneNumber,
  validateDate
} from './validators';

// Re-export everything as default utility object
const utils = {
  formatters,
  validators,
  animations,
  helpers
};

export default utils;
