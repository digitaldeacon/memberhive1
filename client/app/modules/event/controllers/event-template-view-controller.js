export function EventTemplateViewController(
  EventTemplate,
  resolveTemplate,
  resolveEvents,
  $state
) {"ngInject";
  this.template = resolveTemplate;
  this.events = resolveEvents;
 
}
