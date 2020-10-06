jest.mock('socket.io', () => {
  const socket = {
    id: '123',
    nickname: '',
    emit: jest.fn(),
    on: jest.fn(),
    join: jest.fn(),
    to: jest.fn(),
  };
  const on = () => socket;
  const to = jest.fn();
  const emit = jest.fn();
  return jest.fn(() => ({ on, to, emit }));
});

module.exports = require('socket.io');
