import { NotificationsRespository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationRequest {
  recipientId: string;
}
interface CountRecipeintNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationsRespository: NotificationsRespository) {}
  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipeintNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRespository.countManyByRecipientId(
      recipientId,
    );
    return {
      count,
    };
  }
}
