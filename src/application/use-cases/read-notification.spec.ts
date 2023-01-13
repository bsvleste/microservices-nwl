import { makeNotification } from '@test/factory/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be ale to read a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const readNotification = new ReadNotification(
      inMemoryNotificationsRepository,
    );

    const notification = makeNotification();
    await inMemoryNotificationsRepository.create(notification);
    await readNotification.execute({
      notificationId: notification.id,
    });
    expect(inMemoryNotificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });
  it('shoul  not be able to read a notifiction when it doesn not exist', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const readNotification = new ReadNotification(
      inMemoryNotificationsRepository,
    );

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
