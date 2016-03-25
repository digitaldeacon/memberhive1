export function EventController(
    EventService,
    EventTemplate,
    resolveEvent,
    resolveTemplates,
    resolveTemplate,
    Shout,
    $state
) {"ngInject";
  this.item = resolveEvent;
  this.templates = resolveTemplates;
  this.template = resolveTemplate;
  if(!_.isEmpty(resolveTemplate)) {
    this.templateId = resolveTemplate.id;
    this.item.name = resolveTemplate.name;
  } else {
     this.templateId = undefined;
  }

  this.updateTemplate = () => {
    this.template = _.find(this.templates, {id: this.templateId});
    if(!this.item.name) {
      this.item.name = this.template.name;
    }
  };

  this.save = () => {
    this.item.templateId = this.templateId;
    EventService.save(this.item)
      .then(
        () => $state.go("event.list"),
        (err) => Shout.vError(err)
      );
  };

}
