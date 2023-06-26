import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionService from '../../../services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const createSession = container.resolve(CreateSessionService);
    const user = await createSession.execute({ email, password });

    return res.json(instanceToInstance(user));
  }
}
