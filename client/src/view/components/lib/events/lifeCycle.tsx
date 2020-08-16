import { socket } from '../../../../api';
import { useEffect, useState } from 'react';

export const UserJoined = () => {
	const [user, setUser] = useState<UserAction>({
		user: null,
		timestamp: new Date(''),
  });
	useEffect(() => {
		socket.on('userJoined', (data: UserAction) => {
			setUser(data);
		});
	}, []);

	return [user];
};

export const UserLeft = () => {
  const [user, setUser] = useState<UserAction>({
		user: null,
		timestamp: new Date(''),
  });
	useEffect(() => {
		socket.on('userLeft', (data: UserAction) => {
			setUser(data);
		});
	}, []);

	return [user];
};
