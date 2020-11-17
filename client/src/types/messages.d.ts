interface ChatMessage {
  messageType: 'message'
  id: string;
  msg: string;
  user: User;
  timestamp: Date,
  hideMeta?: boolean
}

interface StatusUpdate {
  messageType: 'status'
  id: string,
  msg: string,
  timestamp: Date,
}

type Messages = Array<ChatMessage | StatusUpdate>;
