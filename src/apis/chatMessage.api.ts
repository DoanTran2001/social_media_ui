import http from "../utils/http"

const chatMessageApi = {
  createChatMessage: (data: {receiverId: string, content: string}) => {
    return http.post('/chat/messages', data)
  },
  getChatMessage: (senderId: string, receiverId: string) => {
    return http.get(`chat/messages/${senderId}/${receiverId}`)
  }
}

export default chatMessageApi