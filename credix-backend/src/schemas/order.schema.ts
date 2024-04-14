import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  BuyerInfo,
  Cart,
  PaymentInformation,
  ShippingLocation,
} from '../dto/create_order.dto';

export type OrderDocument = HydratedDocument<Order>;

export enum OrderStatus {
  PENDING = 'pending',
  CREATED = 'created',
  FAILED = 'failed',
}

@Schema()
export class Order {
  @Prop()
  discountAmount: number;
  @Prop()
  shippingCost: number;
  @Prop(raw({}))
  buyer: BuyerInfo;
  @Prop(raw({}))
  cart: Cart;
  @Prop(raw({}))
  shippingLocation: ShippingLocation;
  @Prop(raw({}))
  payment: PaymentInformation;
  @Prop()
  status: OrderStatus;
  @Prop()
  credixOrderId?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
