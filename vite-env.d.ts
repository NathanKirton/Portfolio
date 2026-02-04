/// <reference types="vite/client" />

declare module '*.svg?raw' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

// Icon imports
declare module '../Icons/*.svg?raw' {
  const content: string;
  export default content;
}

declare module '../Icons/*.svg' {
  const content: string;
  export default content;
}
