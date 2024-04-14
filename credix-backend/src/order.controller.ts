import { Body, Controller, Post } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create_order.dto';
import config from './config';

@Controller('orders')
export class OrderController {
  constructor(
    private logger: PinoLogger,
    private orderService: OrderService,
  ) {}

  // TODO: validation
  @Post()
  async create(@Body() createOrder: CreateOrderDto) {
    const order = await this.orderService.createOrder(createOrder);
    return {
      completeOrderUrl: `${config.CREDIX_APP_BASE_URL}/complete-order/?id=${order.credixOrderId}`,
    };
  }
}
