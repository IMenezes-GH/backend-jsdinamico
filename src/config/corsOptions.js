const allowedOrigins = ['http://localhost:3000', 'http://localhost:3500', 'http://localhost:5500', 'https://imenezes-gh.github.io/frontend-jsdinamico/'];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions;