import en from '@/messages/en.json';
import esp from '@/messages/esp.json';

export const getMessages = (lang) => {
  switch (lang) {
    case 'esp':
      return esp;
    case 'en':
    default:
      return en;
  }
};
