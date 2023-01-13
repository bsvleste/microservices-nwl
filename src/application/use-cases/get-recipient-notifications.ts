import { Notification } from '@application/entities/notifications';
import { NotificationsRespository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface GetRecipientNotificationRequest {
  recipientId: string;
}
interface GetRecipeintNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationsRespository: NotificationsRespository) {}
  async execute(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipeintNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRespository.findManyByRecipientId(recipientId);
    return {
      notifications,
    };
  }
}
