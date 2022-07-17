export class Observer {
  constructor() {
    this._subscribers = [];
  }

  subscribe(subscriber) {
    this._subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this._subscribers = this._subscribers.filter((value) => value !== subscriber);
  }

  observe(data) {
    this._subscribers.forEach((subscriber) => subscriber(data));
  }
}