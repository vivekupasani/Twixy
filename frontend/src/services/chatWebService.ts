class ChatWebService {
  private static instance: ChatWebService;
  private socket: WebSocket | null = null;
  private searchResultCallbacks: ((data: any) => void)[] = [];
  private contentCallbacks: ((data: any) => void)[] = [];

  private constructor() {}

  public static getInstance(): ChatWebService {
    if (!ChatWebService.instance) {
      ChatWebService.instance = new ChatWebService();
    }
    return ChatWebService.instance;
  }

  connect(): void {
    this.socket = new WebSocket("ws://localhost:8000/ws/chat");
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'search_result') {
        this.searchResultCallbacks.forEach(callback => callback(data));
      } else if (data.type === 'content') {
        this.contentCallbacks.forEach(callback => callback(data));
      }
    };
  }

  chat(query: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ query }));
    }
  }

  onSearchResult(callback: (data: any) => void): () => void {
    this.searchResultCallbacks.push(callback);
    return () => {
      const index = this.searchResultCallbacks.indexOf(callback);
      if (index > -1) {
        this.searchResultCallbacks.splice(index, 1);
      }
    };
  }

  onContent(callback: (data: any) => void): () => void {
    this.contentCallbacks.push(callback);
    return () => {
      const index = this.contentCallbacks.indexOf(callback);
      if (index > -1) {
        this.contentCallbacks.splice(index, 1);
      }
    };
  }
}

export default ChatWebService.getInstance();
