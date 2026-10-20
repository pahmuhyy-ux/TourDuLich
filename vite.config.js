import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        admin: resolve(import.meta.dirname, 'admin.html'),
        tourdetail: resolve(import.meta.dirname, 'tourdetail.html'),
        trangdonhang: resolve(import.meta.dirname, 'trangdonhang.html'),
        tranggioithieu: resolve(import.meta.dirname, 'tranggioithieu.html'),
        tranglienhe: resolve(import.meta.dirname, 'tranglienhe.html'),
        trangtour: resolve(import.meta.dirname, 'trangtour.html'),
      },
    },
  },
});
