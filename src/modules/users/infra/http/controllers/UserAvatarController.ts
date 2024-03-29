import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();
    const avatar = await updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(instanceToInstance(avatar));
  }
}
