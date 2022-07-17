export class Observer {
  constructor(observer) {
    this._subscribers = [];
    this._observer = observer;
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