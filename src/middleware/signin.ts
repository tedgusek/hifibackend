import { Request, Response, NextFunction } from 'express';

interface SignInData {
    name: string;
    email: string;
    userType: string;
}

export function signinMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, userType }: SignInData = req.body as SignInData;
        
        if (userType === 'User') {
            const dashboardUrl = '/userDashboard';
            res.locals.userData = { dashboardUrl, name, email }; // Attach user data to response locals
            next(); // Call the next middleware or route handler
        } else if (userType === 'Staff') {
            const dashboardUrl = '/adminDashboard';
            res.locals.userData = { dashboardUrl, name, email }; // Attach user data to response locals
            next(); // Call the next middleware or route handler
        } else {
            res.status(400).json({ success: false, message: `${userType}: is invalid` });
        }
    } catch (error) {
        console.error(`Error handling sign-in request: ${error}`);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
