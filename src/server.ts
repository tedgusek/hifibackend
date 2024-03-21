import { signinMiddleware } from "./middleware/signin";
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

import { Request, Response } from "express";

app.use(cors());
app.use(express.json());

interface SignInData {
    name: String;
    email: String;
    userType: String;
}

app.post("/api/signin", signinMiddleware, (req: Request, res: Response) => {
    const { dashboardUrl, name, email } = res.locals.userData;
    res.status(200).json([dashboardUrl, name, email ]);
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


