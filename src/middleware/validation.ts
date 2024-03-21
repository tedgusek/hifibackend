import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

// const check = validator();

interface SignInData {
    name: string;
    email: string;
    description: string;
}

// Basic vaidation started, should add more safety mechanisms

export function validation(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, description }: SignInData = req.body as SignInData;
        if ((!validator.isDataURI(name) && !validator.isDataURI(description)) && validator.isEmail(email)) {
            res.locals.ticket = { name, description, email };
            next();
        } else {
            res.status(400).json({ success: false, message: `Incoming Data is invalid` });
        }
    } catch (error) {
        console.error(`Error handling sign-in request: ${error}`);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
