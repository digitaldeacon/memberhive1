export function EventController(Event, EventTemplate, $stateParams, $state) {
  if($stateParams.eventId) {
    this.item = Event.findById({id: $stateParams.eventId});
    this.template = Event.template({id: $stateParams.eventId});
  } else {
    this.item = {
      name: "New Event"
    };
  }
  this.templates = EventTemplate.find();
  this.updateTemplate = () => {
    
  }
  
  this.save = () => {
    this.item.templateId = this.template.id;
    Event.upsert(this.item).$promise
      .then(() => $state.go("event.all"));
  }
}
