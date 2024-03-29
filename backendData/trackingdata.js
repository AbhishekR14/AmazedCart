import { orders } from "../backendData/ordersdata.js";
import { products } from "../backendData/products.js";
import { convertToDate, compareDates } from "../Scripts/utils/formattedDate.js";

export let trackingHTML = localStorage.getItem("trackingHTML");
if (!trackingHTML) {
  trackingHTML = "";
}
function saveTrackingHTMLToLocalStorage() {
  localStorage.setItem("trackingHTML", trackingHTML);
}
export function updateTrackingHTML(orderId, itemId) {
  trackingHTML = "";
  let selectedItem;
  let selectedOrder;
  let selectedProduct;
  orders.forEach((order) => {
    if (order.orderId === orderId) {
      selectedOrder = order;
      order.items.forEach((item) => {
        if (item.id === itemId) {
          selectedItem = item;
          products.forEach((product) => {
            if (product.id === itemId) {
              selectedProduct = product;
            }
          });
        }
      });
    }
  });
  trackingHTML = `<div class="delivery-date">
    ${arrivingOnOrNot(selectedItem.arrivingDate)} ${selectedItem.arrivingDate}
    </div>
    <div class="product-info">
    ${selectedProduct.name}
    </div>
    <div class="product-info">
    Quantity: ${selectedItem.quantity}
    </div>
    <img class="product-image" src="${selectedProduct.image}">
    <div class="progress-labels-container">
    <div class="progress-label">
        Preparing
    </div>
    <div class="progress-label current-status">
        Shipped
    </div>
    <div class="progress-label">
        Delivered
    </div>
    </div>
    <div class="progress-bar-container">
    <div class="progress-bar${progressBar(selectedItem.arrivingDate)}"></div>
    </div>`;
  saveTrackingHTMLToLocalStorage();
}

function progressBar(arrivingDate) {
  //progress-bar1 , progress-bar2 , progress-bar3 determines when the order is placed
  const arrdate = convertToDate(arrivingDate);
  return compareDates(arrdate);
}

export function arrivingOnOrNot(arrivingDate) {
  const arrdate = convertToDate(arrivingDate);
  if (compareDates(arrdate) === 5) {
    return "Delivered on";
  } else {
    return "Arriving on";
  }
}
