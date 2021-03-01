export function socket() {
    let socket = new WebSocket(`wss://292ff4a9bcef.ngrok.io/ws/chat/meeran/`)
    return socket
}