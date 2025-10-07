// utils/validation.js

/**
 * Validates email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password meets minimum requirements
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum password length (default: 6)
 * @returns {boolean} - True if password meets requirements
 */
export const validatePassword = (password, minLength = 6) => {
  return password && password.length >= minLength;
};

/**
 * Validates that a name field is not empty
 * @param {string} name - Name to validate
 * @returns {boolean} - True if name is valid
 */
export const validateName = (name) => {
  return name && name.trim().length > 0;
};

/**
 * Validates that a role is selected (not empty or default value)
 * @param {string} role - Role to validate
 * @param {string} defaultValue - Default placeholder value to check against
 * @returns {boolean} - True if valid role is selected
 */
export const validateRole = (role, defaultValue = "Role") => {
  return role && role !== defaultValue && role.trim().length > 0;
};

/**
 * Validates login form data
 * @param {Object} formData - Object containing email and password
 * @returns {Object} - Object containing any validation errors
 */
export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!email || !email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
};

/**
 * Validates signup form data
 * @param {Object} formData - Object containing fullName, email, password, and role
 * @returns {Object} - Object containing any validation errors
 */
/**
 * Validates signup form data
 * @param {Object} formData - Object containing firstName, lastName, email, and password
 * @returns {Object} - Object containing any validation errors
 */
<<<<<<< HEAD
export const validateSignupForm = ({ firstName, lastName, email, password }) => {
  const errors = {};

  if (!validateName(firstName)) {
    errors.firstName = 'First name is required';
  }

  if (!validateName(lastName)) {
    errors.lastName = 'Last name is required';
=======
export const validateSignupForm = ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const errors = {};

  if (!validateName(firstName)) {
    errors.firstName = "First name is required";
  }

  if (!validateName(lastName)) {
    errors.lastName = "Last name is required";
>>>>>>> 9cf36835a32646777e32dd7660540ab4eef7723c
  }

  if (!email || !email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!validatePassword(password)) {
    errors.password = "Password must be at least 6 characters long";
  }

  return errors;
};
