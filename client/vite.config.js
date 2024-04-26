import reactRefresh from "@vitejs/plugin-react-refresh";

export default {
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      // Establecer alias para importar Bootstrap Icons y Remixicon desde sus rutas en node_modules
      "bootstrap-icons": "bootstrap-icons/font/bootstrap-icons.css",
      remixicon: "remixicon/fonts/remixicon.css",
    },
  },
  css: {
    preprocessorOptions: {
      // Agregar las importaciones de Bootstrap y Bootstrap Icons en cada archivo CSS/SCSS
      scss: {
        additionalData: `@import "bootstrap/scss/bootstrap";
                          @import "bootstrap-icons/font/bootstrap-icons.css";
                          @import "remixicon/fonts/remixicon.css";`,
      },
    },
  },
};
