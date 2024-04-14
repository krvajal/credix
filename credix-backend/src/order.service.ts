import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create_order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderStatus } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CredixService } from './credix.service';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private logger: PinoLogger,
    private credixService: CredixService,
  ) {}

  async createOrder(createOrder: CreateOrderDto) {
    this.logger.info({ createOrder }, 'creating order');
    const order = await this.orderModel.create({
      ...createOrder,
      status: OrderStatus.PENDING,
    });
    try {
      order.credixOrderId = await this.credixService.createOrder(order);
      order.status = OrderStatus.CREATED;
      return order;
    } catch (err) {
      order.status = OrderStatus.FAILED;
      this.logger.error({ err, order }, 'failed to create order');
    } finally {
      // this save can fail!?
      await order.save();
    }
  }
}
