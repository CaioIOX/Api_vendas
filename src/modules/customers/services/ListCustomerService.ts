import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRespository';

class ListCustomerservice {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = customerRepository.find();

    return customer;
  }
}

export default ListCustomerservice;
