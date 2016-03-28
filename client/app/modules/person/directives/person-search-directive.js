export function mhPersonSearch() {
  return {
    templateUrl: 'app/modules/person/templates/person-search.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
    },
    controller: function($scope, Person) {"ngInject";
      $scope.ngModel = {};//for now we start empty
      $scope.queryModel = [];
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
        {display: "Haushalt Name", name: "household.name", cat: "query", type: "string"},

      ];


      $scope.querySearch = (query) => {
        let currentBlockCat = this.currentBlockCat();
        if(currentBlockCat === "empty" || currentBlockCat === "logic") {
          return $scope.searchQueryBlocks(query);
        } else if(currentBlockCat === "query") {
          return $scope.searchQuery(this.currentBlock(), query)
            .then((d) => _.merge(d, $scope.searchUnaryLogicBlocks(query, this.currentBlock().type)));
        } else if(currentBlockCat === "unaryLogic") {
          let block = _.takeRight($scope.queryModel, 2)[0];
          return $scope.searchQuery(block, query);
        } else if(currentBlockCat === "value") {
          return $scope.searchLogicBlocks(query);
        }
        return [];
      };

      $scope.searchQueryBlocks = (query) => {
         return _.filter(this.queryBlocks, x => _.startsWith(_.lowerCase(x.display), _.lowerCase(query)));
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
        results.then((d) => _.merge(d, add));
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
        if(first.cat !== "query") {
          console.error("ist not of cat query", first);
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
          ret[first.name][second.name] = value.name ;
        } else {
          if(second.cat !== "value") {
            console.error("ist not of cat query", second);
            return {};
          }
          ret[first.name] = second.name;
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

      $scope.$watchCollection(
        "queryModel",
        (newValue) => {
          $scope.ngModel = this.generateQuery(newValue);
        }
      );


    }

  };
}
