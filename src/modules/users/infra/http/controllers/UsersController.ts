import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreaterUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';
import { instanceToInstance } from 'class-transformer';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;
    const listUser = container.resolve(ListUserService);
    const users = await listUser.execute({ page, limit });

    return res.json(instanceToInstance(users));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showUser = container.resolve(ShowUserService);
    const user = await showUser.execute({ id });

    return res.json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = container.resolve(CreaterUserService);
    const user = await createUser.execute({ name, email, password });

    return res.json(instanceToInstance(user));
  }
}
