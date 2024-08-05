app.controller('StoreController', ['$scope', '$http', function ($scope, $http) {

  $http.get('public/products/productList.json').success(function (data) {
    $scope.products = data;
  });

  $scope.shoppingCart = [];
  $scope.total = 0;
  $scope.discount = 0;
  $scope.text = '';

  $scope.addProduct = function (index) {
    var product = $scope.products[index];
    if (product.quantity > 0)
      $scope.shoppingCart.push($scope.products[index]);
  };

  $scope.removeProduct = function (index) {
    $scope.shoppingCart.splice(index, 1);
  };

  $scope.cartTotal = function () {
    $scope.total = 0;
    angular.forEach($scope.shoppingCart, function (product) {
      $scope.total += product.price;
    });
    return $scope.total -= $scope.discount;
  };

  $scope.fiveVoucher = function () {
    if ($scope.total > 5) {
      $scope.discount = 5;
      $scope.text = '£5 discount accepted';
    } else if ($scope.total <= 5) {
      $scope.text = 'Voucher Invalid';
    }
  };

  $scope.tenVoucher = function () {
    if ($scope.total > 50) {
      $scope.discount = 10;
      $scope.text = '£10 discount accepted';
    } else if ($scope.total <= 50) {
      $scope.text = 'Voucher Invalid';
    }
  };

  $scope.fifteenVoucher = function () {
    angular.forEach($scope.shoppingCart, function (product) {
      var checkFootwear = $scope.hasFootwear(product.category);
      if (checkFootwear === true && $scope.total > 75) {
        $scope.discount = 15;
        $scope.text = '£15 discount accepted';
      } else if ($scope.total <= 75 || !checkFootwear) {
      $scope.text = 'Voucher Invalid';
      }
    });
  };

   $scope.hasFootwear = function (product) {
    if (product.search('Footwear') >= 1) {
      return true;
    }
  };

  $scope.addDiscount = function () {
    if ($scope.text === '5off') {
      $scope.fiveVoucher();
    } else if ($scope.text === '10off') {
      $scope.tenVoucher();
    } else if ($scope.text === '15off') {
      $scope.fifteenVoucher();
    } else {
      $scope.text = 'Voucher Invalid';
    }
  };

  $scope.outOfStock = function (product) {
    if (product.quantity === 0) {
      return true;
    }
    return false;
  };

  $scope.stockMsg = function (product) {
    if ($scope.outOfStock(product) === true) {
      return 'This item is out of stock';
    }
  };
}]);
