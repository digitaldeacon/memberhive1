export function EventsController(Event) {"ngInject";
  this.events = Event.find();
}
