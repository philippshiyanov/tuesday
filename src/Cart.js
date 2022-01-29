import React from "react";

function Cart() {
  function checkOut() {
    console.log();
  }
  return (
    <div className="container">
      // <h1>cart</h1>
      //{" "}
      <button id="checkout-button" onClick={checkOut}>
        // checkout //{" "}
      </button>
    </div>
  );
}

export default Cart;
