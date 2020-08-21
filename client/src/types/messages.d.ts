interface ChatMessage {
  messageType: 'message'
  id: string;
  msg: string;
  user: User;
  timestamp: Date,
}

interface StatusUpdate {
  messageType: 'status'
  id: string,
  msg: string,
  timestamp: Date,
}

type Messages = Array<ChatMessage | StatusUpdate>;
