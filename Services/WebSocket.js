export function socket(id) {
    let socket = new WebSocket(`wss://1f1ba12c2d68.ngrok.io/ws/chat/${id}/`)
    return socket
}

export function orderSocket() {
    let socket = new WebSocket(`wss://1f1ba12c2d68.ngrok.io/ws/orders/`)
    return socket
}

export function socketBoy(id) {
    let socket = new WebSocket(`wss://1f1ba12c2d68.ngrok.io/ws/deliveryboys/${id}/`)
    return socket
}