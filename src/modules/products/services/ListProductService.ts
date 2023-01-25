import { getCustomRepository } from 'typeorm';
import redisCache from '@shared/cache/RedisCache';
import Product from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    let products = await redisCache.recover<Product[]>(
      'api_vendas_PRODUCT_LIST',
    );

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save('api_vendas_PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
