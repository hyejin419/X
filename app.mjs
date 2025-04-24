import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";

const app = express();

app.use(express.json());

app.use("/posts", postsRoute);
app.use("/auth", authRoute);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(8080);
