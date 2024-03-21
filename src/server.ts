import { signinMiddleware } from "./middleware/signin";
const express = require("express");

const app = express();
const cors = require("cors");
const PORT = 8080;

import { Request, Response } from "express";
import { validation } from "./middleware/validation";

app.use(cors());
app.use(express.json());

// interface SignInData {
//     name: String;
//     email: String;
//     userType: String;
// }

app.post("/signin", signinMiddleware, (req: Request, res: Response) => {
    const { dashboardUrl, name, email } = res.locals.userData;
    res.status(200).json([dashboardUrl, name, email ]);
});

app.post("/ticket", validation, (req: Request, res: Response) => {
    // Implement Middleware to process the ticket and post it to database
    // Will recieve a Response
    // Send Response
    console.log('Made it to the server', req.body)
    res.status(200).json();
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


