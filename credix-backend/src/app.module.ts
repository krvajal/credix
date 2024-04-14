import { Module } from '@nestjs/common';
import { LoggerModule, Logger } from 'nestjs-pino';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import config from './config';
import { CredixService } from './credix.service';

@Module({
  imports: [
    LoggerModule.forRoot(),
    MongooseModule.forRoot(config.MONGODB_URL),
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CredixService],
})
export class AppModule {}
