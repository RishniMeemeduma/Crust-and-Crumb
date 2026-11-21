var basketCount = 0;

function addToBasket(product) {
  basketCount = basketCount + 1;

  document.getElementById("basket").innerHTML =
    product + " added. Items in basket: " + basketCount;
}
