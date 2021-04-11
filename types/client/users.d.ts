interface User {
  id: string | null,
  nickname: string | null,
}

interface UserAction {
  user: User
  timestamp: Date,
}
