import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/models/IOrder';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<IOrder> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Cliente não encontrado.');
    }

    const productExists = await this.productsRepository.findAllByIds(products);

    if (!productExists.length) {
      throw new AppError('Produtos não encontrados.');
    }

    const existsProductsIds = productExists.map(product => product.id);

    const checkInexistentsProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentsProducts.length) {
      throw new AppError(
        `Não foi possivel encontrar produto de id: ${checkInexistentsProducts[0].id}.`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        productExists.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `A quantidade ${quantityAvailable[0].quantity} não está disponivel para ${quantityAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productExists.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        productExists.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateStock(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
