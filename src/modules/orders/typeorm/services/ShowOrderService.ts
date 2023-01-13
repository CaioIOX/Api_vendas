import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../entities/Orders';
import OrdersRepository from '../repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Pedido não encontrado.');
    }

    return order;
  }
}

export default ShowOrderService;
