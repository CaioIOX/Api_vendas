import { ICreateProduct } from '../models/ICreateProduct';
import { IFindProduct } from '../models/IFindProduct';
import { IProduct } from '../models/IProduct';
import { IProductPaginate } from '../models/IProductPaginate';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate>;
  findAllByIds(products: IFindProduct[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
