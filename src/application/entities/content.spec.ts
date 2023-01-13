import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Voce recebeu uma solicação de amizade');
    expect(content).toBeTruthy();
  });
  it('should not be able to creatre a notification content with less 5 caracters', () => {
    expect(() => new Content('aaa')).toThrow();
  });
  it('should not  be able to creatre a notification content with than 240 caracters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
