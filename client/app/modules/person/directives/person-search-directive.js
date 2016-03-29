export function mhPersonSearch() {
  return {
    templateUrl: 'app/modules/person/templates/person-search.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
      queryModel: '='
    },
    controller: function($scope, Person, Group, Household) {"ngInject";
      $scope.queryModel = $scope.queryModel || [];
     
      $scope.selectedItem = null;
      $scope.searchText = "";

      this.currentBlockCat = () => {
        if($scope.queryModel.length === 0) return "empty";
        return _.last($scope.queryModel).cat;
      };

      this.currentBlock = () => {
        if($scope.queryModel.length === 0) return {};
        return _.last($scope.queryModel);
      };

      this.logicBlocks = [
        {display: "AND", name: "and", cat: "logic"},
        {display: "OR", name: "or", cat: "logic"}
      ];

      this.unaryLogicBlocks = [
        {display: ">", name: "gt", cat: "unaryLogic", type:["number"] },
        {display: ">=", name: "gte", cat: "unaryLogic",  type:["number"] },
        {display: "<", name: "lt", cat: "unaryLogic",  type:["number"] },
        {display: "<=",name: "lte", cat: "unaryLogic",  type:["number"] },
       /* {name: "inq", cat: "unaryLogic",  type:["array"] },
        {name: "nin", cat: "unaryLogic",  type:["array"] },*/
        {display: "NOT", name: "neq", cat: "unaryLogic",  type:["number", "string", "array"] },
        {display: "LIKE", name: "like", cat: "unaryLogic",  type:["string"] },
        {display: "NOT LIKE", name: "nlike", cat: "unaryLogic",  type:["string"] },
      ];

      this.queryBlocks = [
        {display: "Status", name: "status", cat: "query", type: "array"},
        {display: "Tags", name: "tags", cat: "query", type: "array"},
        {display: "First Name", name: "firstName", cat: "query", type: "string"},
        {display: "Middle Name", name: "middleName", cat: "query", type: "string"},
        {display: "Nick name", name: "nickName", cat: "query", type: "string"},
        {display: "Last Name", name: "lastName", cat: "query", type: "string"},
        {display: "Gender", name: "gender", cat: "query", type: "string"},

      ];
      
      this.externQueryBlocks = [
        {display: "Gruppe", searchField: "name", cat: "externQuery", type: "string", model: Group, name: "groupIds"},
        {display: "Haushalt", searchField: "name", cat: "externQuery", type: "string", model: Household, name: "householdIds"},
        {display: "Gruppe Tag", searchField: "tags", cat: "externQuery", type: "array", model: Group, name: "groupIds"},
        {display: "Haushalt tag", searchField: "tags", cat: "externQuery", type: "array", model: Group, name: "householdIds"},
      ];


      $scope.querySearch = (query) => {
        let currentBlockCat = this.currentBlockCat();
        if(currentBlockCat === "empty" || currentBlockCat === "logic") {
          return $scope.searchQueryBlocks(query);
        } else if(currentBlockCat === "query") {
          return $scope.searchQuery(this.currentBlock(), query)
            .then((d) => _.concat(d, $scope.searchUnaryLogicBlocks(query, this.currentBlock().type)));
        } else if(currentBlockCat === "externQuery") {
          return $scope.searchExternQuery(this.currentBlock(), query);
        } else if(currentBlockCat === "unaryLogic") {
          let block = _.takeRight($scope.queryModel, 2)[0];
          return $scope.searchQuery(block, query);
        } else if(currentBlockCat === "value" || currentBlockCat === "externValue") {
          return $scope.searchLogicBlocks(query);
        }
        return [];
      };

      $scope.searchQueryBlocks = (query) => {
        return _.concat(
          _.filter(this.queryBlocks, x => _.startsWith(_.lowerCase(x.display), _.lowerCase(query))),
          _.filter(this.externQueryBlocks, x => _.startsWith(_.lowerCase(x.display), _.lowerCase(query)))
        );
      };
      
      
      $scope.searchLogicBlocks = (query) => {
          return _.filter(this.logicBlocks, x => _.startsWith(_.lowerCase(x.display), _.lowerCase(query)));
      };
      $scope.searchUnaryLogicBlocks = (query, type) => {
        return _.filter(this.unaryLogicBlocks, x => _.startsWith(_.lowerCase(x.display), _.lowerCase(query)) && _.includes(x.type, type));
      };
      $scope.searchQuery = (block, query) => {
        let results = Person.searchValue({field: block.name, text: query}).$promise
          .then((ret) => _.map(ret.data, x => {return {display: x, name: x, cat: "value"};}));
        let add = [];
        if(block.type === "array") {
          add = [{display: "Empty", name: [], cat: "value"}];
        }
        results.then((d) => _.concat(d, add));
        return results;
      };
      
      $scope.searchExternQuery = (block, query) => {
        let results = block.model.searchValue({field: block.searchField, text: query}).$promise
          .then((ret) => _.map(ret.data, x => {return {display: x, name: x, cat: "externValue", model: block.model, field: block.searchField};}));
          
        /*let add = [];
        if(block.type === "array") {
          add = [{display: "Empty", name: [], cat: "value"}];
        }
        results.then((d) => _.concat(d, add));*/
        return results;
      };

      this.order = 0;
      $scope.transformChip = (chip) => {
        let newChip = {};
        if(!_.isObject(chip)) {
          newChip =  {display: chip, name: chip, cat: "value"};
        } else {
           angular.copy(chip, newChip);
        }
        if(newChip.cat === "externValue") {
          console.log("doo extern stuff");
          let query = {where: {}};
          query.where[newChip.field] = newChip.name;
          newChip.name = newChip.model.find({filter: query}).$promise.then((data) => _.map(data, x => x.id));
        }
        newChip.order = this.order;
        this.order++;
        return newChip;
      };

      this.generateQuery = (model) => {
        let query = this.parseQueryBlock(model, {});
        console.log("resulting query", query);
        return query;
      };

      this.parseQueryBlock = (model, query) => {
        let ret = _.cloneDeep(query);
        if(_.isEmpty(model)) return query;

        let first = _.head(model);
        model = _.drop(model);
        console.log(first);
        if(first.cat !== "query" && first.cat !== "externQuery") {
          console.error("ist not of cat query or externQuery", first);
          return query;
        }

        if(_.isEmpty(model)) return query;

        let second = _.head(model);
        model = _.drop(model);

        if(second.cat === "unaryLogic" && !_.isEmpty(model)) {
          let value = _.head(model);
          model = _.drop(model);
          if(value.cat !== "value") {
            console.error("ist not of cat query", value);
            return {};
          }
          ret[first.name] = {};
          ret[first.name][second.name] = value.name;
        } else {
          if(second.cat !== "value" && second.cat !== "externValue") {
            console.error("ist not of cat value or extern value", second);
            return {};
          }
          if(first.cat === "query") {
            ret[first.name] = second.name;
          } else if(first.cat === "externQuery" && second.cat === "externValue"){
            ret[first.name] = {inq: second.name};
          }
        }

        if(model.length === 0) {
          query = ret;
          return query;

        } else {

          let logic = _.head(model);
          model = _.drop(model);
          if(logic.cat !== "logic") {
            console.error("ist not of cat logic", logic);
            query = ret;
            return query;
          }

          let after = this.parseQueryBlock(model, {});

          query[logic.name] = [ret, after];
          return query;
        }
      };
      
      $scope.ngModel = this.generateQuery($scope.queryModel);
      
      $scope.$watchCollection(
        "queryModel",
        (newValue) => {
          $scope.ngModel = this.generateQuery(newValue);
        }
      );


    }

  };
}
