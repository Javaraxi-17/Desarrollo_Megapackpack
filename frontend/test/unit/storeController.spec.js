describe('StoreController', function() {
  var scope, ctrl, $httpBackend;

  beforeEach(module('clothesStore'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('public/products/productList.json').
      respond([{name: 'Mock Product 1', price: 50, quantity: 5}, {name: 'Mock Product 2', price: 50, quantity: 5}]);

    scope = $rootScope.$new();
    ctrl = $controller('StoreController', {$scope: scope});
    $httpBackend.flush();
  }));

  it('should create "productList" model with 2 products fetched from xhr', function() {
    expect(scope.products).toEqual([{name: 'Mock Product 1', price: 50, quantity: 5}, {name: 'Mock Product 2', price: 50, quantity: 5}]);
  });

  it('initializes with an empty shopping cart', function() {
    expect(scope.shoppingCart).toEqual([]);
  });

  it('can add a product to the shopping cart', function() {
    scope.addProduct(0);
    expect(scope.shoppingCart.length).toEqual(1);
  });

  it('can remove a product from the shopping cart', function() {
    scope.removeProduct(0);
    expect(scope.shoppingCart.length).toEqual(0);
  });

  it('calculates the shopping cart total', function() {
    scope.addProduct(0);
    scope.addProduct(1);
    expect(scope.cartTotal()).toEqual(100);
  });

  it('accepts a £5 discount voucher if the cart value is over £5', function() {
    scope.total = 6;
    scope.fiveVoucher();
    expect(scope.discount).toEqual(5);
  });

  it('accepts a £10 discount voucher if the order is over £50', function() {
    scope.total = 55;
    scope.tenVoucher();
    expect(scope.discount).toEqual(10);
  });

  it('does not accept a £10 discount voucher if the cart value is £50 or below', function() {
    scope.total = 50;
    scope.tenVoucher();
    expect(scope.discount).toEqual(0);
  });

  it('accepts a £15 discount voucher if the cart value is over £75 and contains an item of footwear', function() {
    scope.total = 76;
    scope.shoppingCart = [{"category": "Men’s Footwear"}];
    scope.fifteenVoucher();
    expect(scope.discount).toEqual(15);
  });

  it('does not accept a £15 discount voucher if the cart value is over £75 and does not include an item of footwear', function() {
    scope.total = 76;
    scope.shoppingCart = [{"category": "Men’s Casualwear"}];
    scope.fifteenVoucher();
    expect(scope.discount).toEqual(0);
  });

  it('does not accept a £15 discount voucher if the cart value is £75 or below', function() {
    scope.total = 75;
    scope.shoppingCart = [{"category": "Men’s Footwear"}];
    scope.fifteenVoucher();
    expect(scope.discount).toEqual(0);
  });

  it('knows when a product is categorised as Footwear', function() {
    expect(scope.hasFootwear("Men's Footwear")).toBe(true);
  });

  it('knows when the stock level of a product is at 0', function() {
    expect(scope.outOfStock({"quantity": 0})).toBe(true);
  });

  it('knows when a product has stock available', function(){
    expect(scope.outOfStock({"quantity": 1})).toBe(false);
  });

  it('displays a message when out of stock', function() {
    expect(scope.stockMsg({"quantity": 0})).toEqual('This item is out of stock');
  });
});
