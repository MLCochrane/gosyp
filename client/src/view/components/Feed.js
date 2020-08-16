import React, {
  useState,
  useEffect,
} from 'react';
import { socket } from '../../api';
import Form from './Form';

const Feed = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on('connection', (data) => {
      console.log('hi');
    });

    socket.on('userJoined', (data) => {
      console.log(data);
    });

    socket.on('chatMessage', (msg) => {
      setMessages(currentMessages => [...currentMessages, msg]);
    });

    return () => socket.disconnect();
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
Feed.propTypes = {
};