export function socket(id) {
    let socket = new WebSocket(`wss://b328a91df30a.ngrok.io/ws/chat/${id}/`)
    return socket
}

export function orderSocket() {
    let socket = new WebSocket(`wss://b328a91df30a.ngrok.io/ws/orders/`)
    return socket
}

export function socketBoy(id) {
    console.log("DELIVERY ID IS :",id)
    let socket = new WebSocket(`wss://b328a91df30a.ngrok.io/ws/deliveryboys/${id}/`)
    return socket
}