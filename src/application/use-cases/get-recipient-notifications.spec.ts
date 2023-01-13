import { makeNotification } from '@test/factory/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get recipient  Notifications', () => {
  it('should be ale to get recipient notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();

    const getRecipientNotification = new GetRecipientNotification(
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
    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-1',
    });
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
