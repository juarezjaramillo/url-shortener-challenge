export const AppConfig = {
    apiUrl: process.env.NODE_ENV === 'production' ? "http://ec2-100-26-9-129.compute-1.amazonaws.com:8080/" : "http://localhost:8080"
};
