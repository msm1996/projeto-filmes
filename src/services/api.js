import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTk2MmZiZWFjMzE0OTRkMmJkMTIxY2EyNTYxNzFkYiIsIm5iZiI6MTc3NDMxNjQ3OS44OTEsInN1YiI6IjY5YzFlYmJmZjM5OTY5YWU3ZDE1ZjJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V6vQxqDzmn2l8gRBulqP7roMJDetTKmD2SY_x5fdaOk"
    },
});

export default api;
