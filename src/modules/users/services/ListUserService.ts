import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IPaginateUser {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: User[];
}

class ListUserService {
  public async execute(): Promise<IPaginateUser> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.createQueryBuilder().paginate();

    return user as IPaginateUser;
  }
}

export default ListUserService;
