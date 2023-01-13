import { makeNotification } from '@test/factory/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('cancel Notification', () => {
  it('should be ale to cancel a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(
      inMemoryNotificationsRepository,
    );

    const notification = makeNotification();
    await inMemoryNotificationsRepository.create(notification);
    await cancelNotification.execute({
      notificationId: notification.id,
    });
    expect(inMemoryNotificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });
  it('shoul  not be able to cancel a notifiction when it doesn not exist', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(
      inMemoryNotificationsRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
