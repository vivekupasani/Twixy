class ChatWebService {
  private static instance: ChatWebService;
  private socket: WebSocket | null = null;
  private searchResultCallbacks: ((data: any) => void)[] = [];
  private contentCallbacks: ((data: any) => void)[] = [];
  private connectionStateCallbacks: ((isConnected: boolean) => void)[] = [];

  private constructor() {}

  public static getInstance(): ChatWebService {
    if (!ChatWebService.instance) {
      ChatWebService.instance = new ChatWebService();
    }
    return ChatWebService.instance;
  }

  connect(): void {
    // Disconnect existing connection if any
    if (this.socket) {
      this.disconnect();
    }

    this.socket = new WebSocket("ws://localhost:8000/ws/chat");

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.connectionStateCallbacks.forEach(callback => callback(true));
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'search_result') {
        this.searchResultCallbacks.forEach(callback => callback(data));
      } else if (data.type === 'content') {
        this.contentCallbacks.forEach(callback => callback(data));
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      this.connectionStateCallbacks.forEach(callback => callback(false));
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.connectionStateCallbacks.forEach(callback => callback(false));
    };
  }

  disconnect(): void {
    if (this.socket) {
      if (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING) {
        this.socket.close();
      }
      this.socket = null;
      console.log('WebSocket disconnected manually');
    }
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  chat(query: string): void {
    if (this.isConnected()) {
      this.socket!.send(JSON.stringify({ query }));
    } else {
      console.warn('WebSocket is not connected. Attempting to reconnect...');
      this.connect();
      // Retry after a short delay
      setTimeout(() => {
        if (this.isConnected()) {
          this.socket!.send(JSON.stringify({ query }));
        }
      }, 1000);
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
