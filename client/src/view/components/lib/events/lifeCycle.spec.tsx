import React from 'react';
import io, { Socket } from 'socket.io-client';
import { render, screen } from '@testing-library/react';
import { UserJoined, UserLeft } from './lifeCycle';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

const userObject = ({
  user,
  timestamp = new Date(''),
}: UserAction) => ({
  user,
  timestamp,
});

it('UserJoined hook returns user on socket event', () => {
  (mockedSocket.on as jest.Mock)
    .mockImplementationOnce((event, cb) => cb(
      {
        status: 'success',
        data: {
          userAction: userObject({
            user: {
              id: '123',
              nickname: 'goober',
            },
            timestamp: new Date('Wednesday 12, 2014'),
          }),
        },
      },
    ))
    .mockImplementationOnce((event, cb) => cb(
      {
        status: 'success',
        data: {
          userAction: userObject({
            user: {
              id: '591',
              nickname: 'Petunia',
            },
            timestamp: new Date('Wednesday 12, 2014'),
          }),
        },
      },
    ));

  const DummyComp = () => {
    const [user] = UserJoined();
    return (
      <>
        <h1 data-testid="userid">{ user.user.id }</h1>
        <h2 data-testid="nickname">{ user.user.nickname }</h2>
      </>
    );
  };

  const { unmount } = render(<DummyComp />);
  expect(screen.getByTestId('userid').textContent).toBe('123');
  expect(screen.getByTestId('nickname').textContent).toBe('goober');

  unmount();

  render(<DummyComp />);
  expect(screen.getByTestId('userid').textContent).toBe('591');
  expect(screen.getByTestId('nickname').textContent).toBe('Petunia');
});

it('UserLeft hook returns user on socket event', () => {
  (mockedSocket.on as jest.Mock)
    .mockImplementationOnce((event, cb) => cb(
      {
        status: 'success',
        data: {
          userAction: userObject({
            user: {
              id: '160',
              nickname: 'Hector',
            },
            timestamp: new Date('February 12, 2014'),
          }),
        },
      },
    ))
    .mockImplementationOnce((event, cb) => cb(
      {
        status: 'success',
        data: {
          userAction: userObject({
            user: {
              id: '858',
              nickname: 'Raj',
            },
            timestamp: new Date('Wednesday 12, 2014'),
          }),
        },
      },
    ));

  const DummyComp = () => {
    const [user] = UserLeft();
    return (
      <>
        <h1 data-testid="userid">{ user.user.id }</h1>
        <h2 data-testid="nickname">{ user.user.nickname }</h2>
      </>
    );
  };

  const { unmount } = render(<DummyComp />);
  expect(screen.getByTestId('userid').textContent).toBe('160');
  expect(screen.getByTestId('nickname').textContent).toBe('Hector');

  unmount();

  render(<DummyComp />);
  expect(screen.getByTestId('userid').textContent).toBe('858');
  expect(screen.getByTestId('nickname').textContent).toBe('Raj');
});
