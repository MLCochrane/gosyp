import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChatMessage from 'view/components/lib/events/chatMessage';
import { UserJoined, UserLeft } from 'view/components/lib/events/lifeCycle';
import UserMessage from './messages/UserMessage';
import StatusMessage from './messages/StatusMessage';

const useStyles = makeStyles(() => (
  {
    feed: {
      flexGrow: 1,
      overflowY: 'auto',
    },
  }
));

const Feed = () => {
  const classes = useStyles();
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

  const messageBody = (message: ChatMessage | StatusUpdate, index: number) => {
    if (message.messageType === 'message') {
      let hideMeta = false;
      const prevMessage = messages[index - 1] ? messages[index - 1] : null;
      if (
        prevMessage
        && prevMessage.messageType === 'message'
        && prevMessage.user.id === message.user.id
      ) {
        hideMeta = true;
      }

      return (
        <UserMessage
          hideMeta={ hideMeta }
          { ...message }
        />
      );
    }
    return <StatusMessage { ...message } />;
  };

  return (
    <Paper
      elevation={ 0 }
      ref={ feedRef }
      className={ classes.feed }
    >
      <ul>
        {
          messages.map((el, index) => (
            <li
              key={ el.id }
            >
              { messageBody(el, index) }
            </li>
          ))
        }
      </ul>
    </Paper>
  );
};
export default Feed;
