export function EventTemplateController(
  EventTemplate,
  EventTemplateOptions,
  $stateParams, 
  $state
) {"ngInject";
  this.types = EventTemplateOptions;
  
  
  if($stateParams.templateId) {
    this.item = EventTemplate.findById({id: $stateParams.templateId});
  } else {
    this.item = {
      name: "New Event Template",
      data: [
        {
          name: "New Name",
          type: "text"
        }
      ]
    };
  }
  
  this.newOption = () => {
    var data = {name: "New Option",type: "text"};
    this.item.data.push(data);
  };
  
  this.save = () => {
    EventTemplate.upsert(this.item).$promise
      .then(() => $state.go("event.templates"));
  };
  
  this.deleteOption = (index) => {
    this.item.data.splice(index,1);
  };
}
