export function EventController(
    EventService,
    EventTemplate,
    resolveEvent,
    resolveTemplates,
    resolveTemplate,
    $state
) {"ngInject";
  this.item = resolveEvent;
  this.templates = resolveTemplates;
  this.template = resolveTemplate;
  this.templateId = resolveTemplate.id;

  this.updateTemplate = () => {
    this.template = _.find(this.templates, {id: this.templateId});
  };

  this.save = () => {
    this.item.templateId = this.templateId;
    EventService.save(this.item).then(() => $state.go("event.list"));
  };


}
