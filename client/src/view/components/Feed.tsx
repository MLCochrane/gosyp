import React, {
  useState,
  useEffect,
} from 'react';
import ChatMessage from './lib/events/chatMessage';
import { UserJoined, UserLeft } from './lib/events/lifeCycle';

import './feed.scss';
import UserMessage from './messages/UserMessage';
import StatusMessage from './messages/StatusMessage';

const Feed = () => {
  const [messages, setMessages] = useState<Messages>([]);
  const [newMessage] = ChatMessage();
  const [userHasJoined] = UserJoined();
  const [userHasLeft] = UserLeft();

  useEffect(() => {
    if (newMessage.msg !== '') {
      setMessages((currentMessages) => [...currentMessages, newMessage]);
    }
  }, [newMessage]);

  useEffect(() => {
    if (userHasJoined.user) {
      const status: StatusUpdate = {
        messageType: 'status',
        id: userHasJoined.user,
        msg: `${ userHasJoined.user } has joined the chat.`
      };

      setMessages((currentMessages) => [...currentMessages, status]);
    }
	}, [userHasJoined]);

  useEffect(() => {
    if (userHasLeft.user) {
      const status: StatusUpdate = {
        messageType: 'status',
        id: userHasLeft.user,
        msg: `${userHasLeft.user} has left the chat.`
      };

      setMessages((currentMessages) => [...currentMessages, status]);
    }
	}, [userHasLeft]);

  return (
    <div className="feed">
      <ul>
        {
          messages.map(el => (
            <li
              key={ el.id }
            >
              {
                el.messageType === 'message'
                ? <UserMessage { ...el } />
                : <StatusMessage { ...el } />
              }
            </li>
          ))
        }
      </ul>
    </div>
  )
}
export default Feed;
