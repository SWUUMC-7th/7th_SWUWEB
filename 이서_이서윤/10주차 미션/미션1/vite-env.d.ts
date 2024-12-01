/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_TMDB_URL: string;
    VITE_API_KEY: string;
  }
  
interface ImportMeta {
  readonly env: ImportMetaEnv;
  }