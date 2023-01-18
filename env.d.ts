/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CLOUD_NAME: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_API_KEY: string;
  readonly VITE_APP_API_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
