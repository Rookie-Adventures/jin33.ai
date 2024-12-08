/// <reference types="vite/client" />

declare module 'virtual:env' {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_SOCKET_URL: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_ENV: 'development' | 'production' | 'test';
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  export { ImportMetaEnv, ImportMeta };
}
