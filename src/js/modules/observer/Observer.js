export class Observer {
  constructor() {
    this._subscribers = [];
  }

  subscribe(...subscribers) {
    this._subscribers.push(...subscribers);
  }

  unsubscribe(subscriber) {
    this._subscribers = this._subscribers.filter((value) => value !== subscriber);
  }

  observe(data) {
    this._subscribers.forEach((subscriber) => subscriber(data));
  }
}