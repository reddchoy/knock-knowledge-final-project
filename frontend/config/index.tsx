const dev = process.env.NODE_ENV !== 'production';

const googleClientId = process.env.GOOGLE_CLIENT_ID;

export const server = dev ? 'http://localhost:8080' : 'https://api.knockknowledge.studio';

export const url = dev ? 'http://localhost:3000' : 'https://knockknowledge.studio';
