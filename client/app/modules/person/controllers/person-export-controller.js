import {saveAs} from "../../../scripts/FileSaver.min";

export function PersonExportController(GAuth,$rootScope, GApi, $http, Person) {
  /*
  
  var CLIENT = '88164908200-d3jlteogf8d67m5lefqqsppuq8ehbbec.apps.googleusercontent.com';
  GApi.load('plus', 'v1');
  GAuth.setClient(CLIENT);
  GAuth.setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.google.com/m8/feeds');
  this.authenticate = () => {
      GAuth.login().then(() => {
        console.log("ok")
        GAuth.getToken().then((token) => this.token = token.access_token);
      });
      
  };
  
  this.get = () => {
    Person.find().$promise.then((data) => {
      this.upload(data[0]);
      console.log(data);
    })
  };
  
  this.upload = (contact) => {
    $http({
      method: 'POST',
      url: 'https://www.google.com/m8/feeds/contacts/default/full?access_token=' + this.token,
      data: this.contactToXml(contact),
      headers: {
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': null
    },
    }).then((response) => {
      console.log(response)
    });
  }
  
  this.contactToXml = (contact) => {
    
    return `<atom:entry xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:gd="http://schemas.google.com/g/2005">
  <atom:category scheme="http://schemas.google.com/g/2005#kind"
    term="http://schemas.google.com/contact/2008#contact"/>
  <gd:name>
     <gd:givenName>${contact.firstName}</gd:givenName>
     <gd:familyName>${contact.lastName}</gd:familyName>
  </gd:name>
  <atom:content type="text">Notes</atom:content>
  <gd:email rel="http://schemas.google.com/g/2005#work"
    primary="true"
    address="${contact.email}" displayName="E. Bennet"/>
  <gd:phoneNumber rel="http://schemas.google.com/g/2005#work"
    primary="true">
    ${contact.contact.home}
  </gd:phoneNumber>
</atom:entry>`


  }
*/
  
  this.getAllVCard = () => {
    Person.exportVCard().$promise.then(
      (data) => {
        console.log(data);
        var file = new Blob([data.vcard], { type: 'text/vard' });
        saveAs(file, "export.vcard");
      }
    );
  };
}
