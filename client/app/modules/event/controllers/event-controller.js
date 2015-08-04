export function EventController(Event, EventTemplate, $stateParams, $state) {
  if($stateParams.eventId) {
    this.item = Event.findById({id: $stateParams.eventId});
    Event.template({id: $stateParams.eventId}).$promise
     .then((d) => {
       this.template = d;
       this.templateId = d.id;
     });
  } else {
    this.item = {
      name: "New Event"
    };
  }
  this.templates = EventTemplate.find();
  this.updateTemplate = () => {
    this.template = _.find(this.templates, {id: this.templateId});
  };
  
  this.save = () => {
    console.log(this.item.data);
    this.item.templateId = this.templateId;
    Event.upsert(this.item).$promise
      .then(() => $state.go("event.all"));
  };
  
}
