import {NextFunction, Request, Response, Router} from 'express';

export interface iControllerRoute {
    path: string,
    func: (req: Request, res: Response, next: NextFunction) => void
    method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'> // почитать про Pick
}
