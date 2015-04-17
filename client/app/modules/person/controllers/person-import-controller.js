import _ from 'lodash';


export function PersonImportController(Person, GemFileReader, Shout, $scope, gettext)
{
  this.csvToArray = (strData, strDelimiter) => {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
      (
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        
        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        
        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
    );
    
    
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    
    
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    /*jshint -W084 */
    while (arrMatches = objPattern.exec( strData )) {
      
      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[ 1 ];
      
      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (
        strMatchedDelimiter.length &&
        strMatchedDelimiter !== strDelimiter
      ){
        
        // Since we have reached a new row of data,
        // add an empty row to our data array.
        arrData.push( [] );
        
      }
      
      var strMatchedValue;
      
      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[ 2 ]){
        
        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        strMatchedValue = arrMatches[ 2 ].replace(
          new RegExp( "\"\"", "g" ),
                                                  "\""
        );
        
      } else {
        
        // We found a non-quoted value.
        strMatchedValue = arrMatches[ 3 ];
        
      }
      
      // Now that we have our value string, let's add
      // it to the data array.
      arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    
    // Return the parsed data.
    return( arrData );
  };
  
  this.uploadImportFile = (files) => {
    if(files && files[0]) {
      GemFileReader.readAsText(files[0], 'UTF-8', $scope).then(
        (resp) => {
          this.fillTable(this.csvToArray(resp));
          Shout.sSuccess(gettext("File read"));
        }, (err) => {
          Shout.sError(err);
        }
      );
    }
  };
  this.options = Object.keys(Person.model.properties);
  this.assign = [];
  this.showTable = false;
  this.tableData = {};
  
  this.fillTable = (data) => {
    this.tableData = data;
    this.showTable = true;
  };
  
  
  this.import = () => {
    console.log(this.assign);
    var persons = _.map(_.drop(this.tableData), this.convert);
    _.forEach(persons, (person, pos) => {
      if(person.lastName !== undefined) {
        Person.upsert(person).$promise.then(
          (data) => Shout.sSuccess(gettext("Person imported ") + data.firstName + " " + data.lastName),
          (err) => Shout.sError(err)
        );
      }
    });
    console.log(persons);
  };
  
  // converts a csv row to a person, using the user defined bijection from csv to person attributes
  this.convert = (row) => {
    var person = {};
    _.forEach(row, (value, pos) => {
      if(this.assign[pos])
        person[this.assign[pos]] = value;
    }); 
    return person;
  };
}