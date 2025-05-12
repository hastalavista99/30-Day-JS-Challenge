// Exercise: Create a simple pub/sub (event emitter) system


class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        (this.events[event] ||= []).push(listener);
    }

    off(event, listener) {
        this.events[event] = (this.events[event] || []).filter(l => l !== listener);
    }

    emit(event, data) {
        (this.events[event] || []).forEach(listener => listener(data));
    }
}

// Example usage:
const bus = new EventEmitter();
const greet = name => console.log(`Hello, ${name}`);
bus.on('greet', greet);
bus.emit('greet', 'Jackson'); // Hello, Jackson
bus.off('greet', greet);
