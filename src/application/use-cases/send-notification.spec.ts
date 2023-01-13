import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('should be ale to send a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const sendNotification = new SendNotification(
      inMemoryNotificationsRepository,
    );

    await sendNotification.execute({
      content: 'send a new notification',
      category: 'social',
      recipientId: 'exemple-id-recipient',
    });
    expect(inMemoryNotificationsRepository.notifications).toHaveLength(1);
  });
});
