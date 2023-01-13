import { makeNotification } from '@test/factory/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should be ale to unread a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(
      inMemoryNotificationsRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });
    await inMemoryNotificationsRepository.create(notification);
    await unreadNotification.execute({
      notificationId: notification.id,
    });
    expect(inMemoryNotificationsRepository.notifications[0].readAt).toBeNull();
  });
  it('shoul  not be able to read a notifiction when it doesn not exist', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(
      inMemoryNotificationsRepository,
    );

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
