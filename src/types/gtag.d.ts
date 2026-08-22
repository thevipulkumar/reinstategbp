export {};

declare global {
  interface Window {
    /** Defined by gtag.js once GoogleAnalytics has loaded. */
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}
