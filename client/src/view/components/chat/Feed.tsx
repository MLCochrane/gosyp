import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import ChatMessage from '../lib/events/chatMessage';
import { UserJoined, UserLeft } from '../lib/events/lifeCycle';
import UserMessage from './messages/UserMessage';
import StatusMessage from './messages/StatusMessage';

import './feed.scss';

const Feed = () => {
  const [messages, setMessages] = useState<Messages>([]);
  const [newMessage] = ChatMessage();
  const [userHasJoined] = UserJoined();
  const [userHasLeft] = UserLeft();
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simply checks if the message event has content and adds to feed
    if (newMessage.msg !== '') {
      setMessages((currentMessages) => [...currentMessages, newMessage]);
    }
  }, [newMessage]);

  useEffect(() => {
    // Listens to user joining event and adds message to feed
    if (userHasJoined.user.id) {
      console.log(userHasJoined);
      const status: StatusUpdate = {
        messageType: 'status',
        id: (Math.random() + 1).toString(36).substring(7),
        msg: `${userHasJoined.user.nickname || userHasJoined.user.id} has joined the chat.`,
        timestamp: userHasJoined.timestamp,
      };

      setMessages((currentMessages) => [...currentMessages, status]);
    }
  }, [userHasJoined]);

  useEffect(() => {
    // Listens to user leaving event and adds message to feed
    if (userHasLeft.user.id) {
      const status: StatusUpdate = {
        messageType: 'status',
        id: (Math.random() + 1).toString(36).substring(7),
        msg: `${userHasLeft.user.nickname || userHasLeft.user.id} has left the chat.`,
        timestamp: userHasLeft.timestamp,
      };

      setMessages((currentMessages) => [...currentMessages, status]);
    }
  }, [userHasLeft]);

  useEffect(() => {
    /*
    * When the messages array changes, scroll to the bottom of the feed.
    *
    * Ensures that the most recent message is always in view.
    */
    const handleScroll = () => {
      if (feedRef.current !== null) {
        feedRef.current.scrollTop = feedRef.current.scrollHeight;
      }
    };

    if (messages) {
      handleScroll();

      // Could append additional logic here for when feed is updated.
    }
  }, [messages]);

  return (
    <div
      ref={ feedRef }
      className="feed chat__component"
    >
      <ul>
        {
          messages.map((el) => (
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
  );
};
export default Feed;
