import { makeNotification } from '@test/factory/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count recipient  Notification', () => {
  it('should be ale to count recipeint notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const countRecipientNotification = new CountRecipientNotification(
      inMemoryNotificationsRepository,
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await inMemoryNotificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );
    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });
    expect(count).toEqual(2);
  });
});
