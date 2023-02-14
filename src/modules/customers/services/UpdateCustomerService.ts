import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('customersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Cliente não encontardo.');
    }

    const customerUpdateEmail = await this.customersRepository.findByEmail(
      email,
    );

    if (customerUpdateEmail && customer.email !== email) {
      throw new AppError('Este email já está sendo usado.');
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
