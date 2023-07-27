/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_FB_API_KEY: string;
  VITE_FB_AUTH_DOMAIN: string;
  VITE_FB_PROJECT_ID: string;
  VITE_FB_STORAGE_BUCKET: string;
  VITE_FB_MESSAGING_SENDER_ID: string;
  VITE_FB_APP_ID: string;
  VITE_FB_MEASUREMENT_ID: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
