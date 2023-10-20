import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000", // anytime you see /api add localhost 3000 in front
                secure: false,
            },
        },
    },
    plugins: [react()],
});
