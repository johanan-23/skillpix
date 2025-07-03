/**
 * An array of public routes that do not require authentication.
 * These routes are accessible to all users.
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/login",
  "/contact",
  "/about-us",
  "/terms",
  "/privacy-policy",
  "/subscribe-newsletter",
  "/api/chatbot"
];

/**
 * An array of public routes that are used for Authentication.
 * These routes will redirect to the `/dashboard` if the user is already authenticated.
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/login",
];

/**
 * The prefix for API authentication routes.
 * Routes that that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";

