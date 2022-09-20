import { defineConfig } from 'cypress';

export default defineConfig({
    video: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    videoUploadOnPasses: false,
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 20000,

    e2e: {
        baseUrl: 'http://localhost:3000',
    },
});
