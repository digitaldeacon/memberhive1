export function EventTemplateController(EventTemplate, $stateParams, $state) {
  this.types = [
    {name: "Text", value: "text"},
    {name: "Date", value: "date"},
    {name: "Person", value: "person"}
  ];
  
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
}
