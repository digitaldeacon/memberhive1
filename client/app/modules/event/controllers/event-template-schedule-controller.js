export function EventTemplateScheduleController(
  EventTemplate,
  resolveTemplate,
  $state
) {"ngInject";
  this.template = resolveTemplate;
  
  this.save = () => {
    EventTemplate.upsert(this.template).$promise
      .then(() => $state.go("event.template", {templateId: this.template.id}));
  };
}
