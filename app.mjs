import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import session from "session";

const app = express();

app.use(express.json());
app.use(
    session({
        secret: "!@#$%^&*()",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

app.use("/posts", postsRoute);
app.use("/auth", authRoute);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(8080);
