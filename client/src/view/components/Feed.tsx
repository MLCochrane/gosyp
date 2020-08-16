import React, {
  useState,
  useEffect,
} from 'react';
import { socket } from '../../api';
import Form from './Form';

const Feed = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('connection', (data: string) => {
      console.log('hi');
    });

    socket.on('userJoined', (data: string) => {
      console.log(data);
    });

    socket.on('chatMessage', (msg: Message) => {
      setMessages(currentMessages => [...currentMessages, msg]);
    });

    // If not wrapped it will return a value.
    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <div className="feed">
      <ul>
        {
          messages.map(el => (
            <li
              key={ el.id }
            >
              { el.userId }: { el.msg }
            </li>
          ))
        }
      </ul>
      <Form />
    </div>
  )
}
export default Feed;
