import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notifications';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'pessoal',
    content: new Content('Nova solicitação'),
    createdAt: new Date(),
    recipientId: 'recipient-2',
    ...override,
  });
}
