export function EventController(
    EventService,
    EventTemplate,
    resolveEvent,
    resolveTemplate,
    $state
) {"ngInject";
  console.log(resolveEvent);
  this.item = resolveEvent;
  this.template = resolveTemplate;
  this.templateId = resolveTemplate.id;

  this.templates = EventTemplate.find();

  this.updateTemplate = () => {
    this.template = _.find(this.templates, {id: this.templateId});
  };

  this.save = () => {
    this.item.templateId = this.templateId;
    EventService.save(this.item).then(() => $state.go("event.all"));
  };


}
