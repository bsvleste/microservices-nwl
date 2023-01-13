import { NotificationsRespository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}
type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRespository: NotificationsRespository) {}
  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationsRespository.findById(
      notificationId,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.read();

    await this.notificationsRespository.save(notification);
  }
}
