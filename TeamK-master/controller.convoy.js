app.controller('ConvoyCtrl', ['$scope', 'ConvoyDataService', function($scope, ConvoyDataService) {
    $scope.items = [];
    var loadingListener;

    //Fetch convoy data
    $scope.fetchConvoy = function() {
        if ($scope.refreshing == true) return;

        $scope.refreshing = true;
        loadingListener = $scope.$on('convoy-load-finished', function(event) {
            loadingListener();
            $scope.refreshing = false;
            $scope.items = ConvoyDataService.getItems();
            $scope.$apply(); //force update of items list
        });

        ConvoyDataService.loadConvoyData();
    };

    //Initialize items list, load it if it hasn't been already
    if (ConvoyDataService.getItems() == null) $scope.fetchConvoy();
    else $scope.items = ConvoyDataService.getItems();

    //Color Constants
    const ROW_COLORS = {
        'Sword': '#ff8282',
        'Lance': '#8290ff',
        'Axe': '#5eba60',
        'Bow': '#efdf4a',
        'Rhyme' : '#d666bc',
        'Wand' : '#5bb28f',
        'Poppet' : '#eaad52',
        'Wonder' : '#a04dc1',
        'Natural' : '#878787'
    }

    //Filter settings
    var sortOrder = 'name';
    $scope.showSword = true;
    $scope.showLance = true;
    $scope.showAxe = true;
    $scope.showBow = true;
    $scope.showRhyme = true;
    $scope.showWand = true;
    $scope.showPoppet = true;
    $scope.showWonder = true;
    $scope.showNatural = true;
    $scope.showOther = true;

    $scope.getItemSortOrder = function() {
        return sortOrder;
    };

    $scope.displayItemType = function(type) {
        if ($scope["show" + type] == undefined) return $scope.showOther;
        else if(type == "Wing" || type == "Fin" || type == "Claw") return $scope.showNatural;
        return $scope["show" + type] == true;
    };

    $scope.updateSortOrder = function(newOrder) {
        sortOrder = newOrder;
    };

    $scope.getRowColor = function(type) {
        var color = ROW_COLORS[type];
        if (color != undefined) return color;
        else return 'lightgray';
    };

    $scope.allChecked = function() {
        return $scope.showSword && $scope.showLance && $scope.showAxe && $scope.showBow && $scope.showRhyme &&
            $scope.showWand && $scope.showPoppet && $scope.showWonder && $scope.showNatural && $scope.showOther;
    };

    $scope.setAllCheckboxes = function() {
        var val = !($scope.allChecked());
        $scope.showSword = val;
        $scope.showLance = val;
        $scope.showAxe = val;
        $scope.showBow = val;
        $scope.showRhyme = val;
        $scope.showWand = val;
        $scope.showPoppet = val;
        $scope.showWonder = val;
        $scope.showNatural = val;
        $scope.showOther = val;
    };

    $scope.closeConvoy = function() {
        $scope.$parent.$parent.showConvoy = false;
    };
}]);
