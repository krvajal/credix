import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import config from './config';
import { Order } from './schemas/order.schema';
import { Types } from 'mongoose';
import { ProductInfo } from './common';

@Injectable()
export class CredixService {
  private apiClient: AxiosInstance;
  constructor() {
    this.apiClient = axios.create({
      baseURL: config.CREDIX_API_BASE_URL,
      headers: {
        'X-CREDIPAY-API-KEY': config.CREDIX_API_KEY,
      },
    });
  }

  computeCost(products: ProductInfo[]) {
    return products.reduce((acc, p) => {
      return acc + p.quantity * p.unitCost;
    }, 0);
  }

  async createOrder(order: Order & { _id: Types.ObjectId }): Promise<string> {
    // todo: handle network failures, timeouts, rate limiting, etc
    const res = await this.apiClient.post<{ id: string }>('/v1/orders', {
      externalId: order._id.toHexString(),
      subtotalAmountCents: this.computeCost(order.cart.products) * 100,
      // NOTE: not implemented
      taxAmountCents: 0,
      shippingCostCents: order.shippingCost * 100,
      buyer: {
        company: {
          taxId: order.buyer.taxId,
        },
      },
      shippingLocation: order.shippingLocation,
      paymentTermDays: parseInt(order.payment.term),
      orderDate: new Date().toISOString(),
      estimatedDeliveryDateUTC: new Date().toISOString(),
      seller: {
        company: {
          taxId: config.TAX_ID,
        },
      },

      // NOTE: this seems to be doing nothing
      successUrl: `${config.PUBLIC_URL}/orders/success`,
      errorUrl: `${config.PUBLIC_URL}/orders/error`,
      cancelUrl: `${config.PUBLIC_URL}/orders/cancel`,
    });
    return res.data.id;
  }
}
