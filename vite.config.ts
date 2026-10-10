import { defineConfig } from 'vite';

export default defineConfig({
    // Die App liegt auf dem Server im Unterordner /Projekte/memory/
    // und nicht direkt an der Domain-Wurzel. Vite setzt diesen Pfad
    // beim Build vor alle Verweise auf JS-, CSS- und Font-Dateien.
    base: '/Projekte/memory/',
});
