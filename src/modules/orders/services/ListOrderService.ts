import { inject, injectable } from 'tsyringe';
import { IOrderPaginate } from '../domain/models/IOrderPaginate';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<IOrderPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const orders = await this.ordersRepository.findAll({ page, skip, take });

    return orders;
  }
}

export default ListOrderService;
