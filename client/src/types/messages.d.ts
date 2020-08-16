interface ChatMessage {
  messageType: 'message'
  id: string;
  msg: string;
  userId: string;
}

interface StatusUpdate {
  messageType: 'status'
  id: string,
  msg: string,
}

type Messages = Array<ChatMessage | StatusUpdate>;