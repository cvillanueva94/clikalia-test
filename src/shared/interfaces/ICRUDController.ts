import { Request, Response } from 'express';

export interface ICRUDController {
	list(req: Request, res: Response): Promise<void> | void;
	create(req: Request, res: Response): Promise<void> | void;
	update(req: Request, res: Response): Promise<void> | void;
	read(req: Request, res: Response): Promise<void> | void;
	delete(req: Request, res: Response): Promise<void> | void;
}
