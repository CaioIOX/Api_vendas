import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRespository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

class ListCustomerservice {
  public async execute(): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerservice;
