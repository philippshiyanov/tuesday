import "./App.css";
import interact from "interactjs";
import data from "./data";

let cart = [];

// target elements with the "draggable" class
interact(".draggable").draggable({
  // enable inertial throwing
  inertia: true,

  // enable autoScroll
  autoScroll: true,

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function (event) {},
});

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

// enable draggables to be dropped into this
interact(".dropzone").dropzone({
  // only accept elements matching this CSS selector
  accept: ".drag-drop",
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add("drop-active");
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add("drop-target");
    draggableElement.classList.add("can-drop");
    //draggableElement.textContent = "Dragged in";
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove("drop-target");
    event.relatedTarget.classList.remove("can-drop");
    event.relatedTarget.classList.remove("in-cart");
    let filtered = cart.filter(function (f) {
      return f !== event.relatedTarget.id;
    });
    cart = filtered;
    console.log(cart);
    //event.relatedTarget.textContent = "Dragged out";
  },
  ondrop: function (event) {
    //event.relatedTarget.textContent = "Dropped";
    event.relatedTarget.classList.add("in-cart");
    cart.push(event.relatedTarget.id);

    console.log(cart);
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove("drop-active");
    event.target.classList.remove("drop-target");
  },
});

interact(".drag-drop").draggable({
  inertia: true,
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "parent",
      endOnly: true,
    }),
  ],
  autoScroll: true,
  // dragMoveListener from the dragging demo above
  listeners: { move: dragMoveListener },
});

interact(".drag-drop").on("hold", function (event) {
  if (event.currentTarget.lastChild.classList.contains("hide")) {
    event.currentTarget.lastChild.classList.remove("hide");
    event.currentTarget.firstChild.classList.add("blur");
  } else {
    event.currentTarget.firstChild.classList.remove("blur");
    event.currentTarget.lastChild.classList.add("hide");
  }
  console.log(event.currentTarget.lastChild);
});

interact(".drag-drop").on("tap", (e) => {
  if (!e.currentTarget.classList.contains("enlarge")) {
    e.currentTarget.classList.add("enlarge");
    e.currentTarget.classList.remove("enlarge2");
    console.log(1);
  } else if (!e.currentTarget.classList.contains("enlarge2")) {
    e.currentTarget.classList.add("enlarge2");
    console.log(2);
  } else {
    console.log(3);
    e.currentTarget.classList.remove("enlarge");
    e.currentTarget.classList.remove("enlarge2");
  }
});

function App() {
  function logCart() {
    function handleClick(e) {
      e.preventDefault();
      console.log("The link was clicked.");
    }
    return console.log(cart);
  }
  return (
    <div className="shop">
      <div className="zone">
        <div id="1" className="drag-drop draggable" tabIndex="0">
          <img src={require("./img/the.png")} alt="" />
          <h1 className="price hide">$3</h1>
        </div>

        <div id="2" className="drag-drop draggable" tabIndex="0">
          <img src={require("./img/2002.png")} alt="" />
          <h1 className="price hide">$2</h1>
        </div>

        <div id="3" className="drag-drop draggable" tabIndex="0">
          <img src={require("./img/dance.png")} alt="" />
          <h1 className="price hide">$4</h1>
        </div>

        <div id="4" className="drag-drop draggable" tabIndex="0">
          <img src={require("./img/easter.png")} alt="" />
          <h1 className="price hide">$5</h1>
        </div>

        <div id="5" className="drag-drop draggable" tabIndex="0">
          <img src={require("./img/me.png")} alt="" />
          <h1 className="price hide">$5</h1>
        </div>

        <div id="6" className="drag-drop draggable" tabIndex="0">
          <img src={require("./img/soul.png")} alt="" />
          <h1 className="price hide">$3</h1>
        </div>

        <div id="7" className="drag-drop draggable" tabIndex="0">
          <img src={require("./img/3.png")} alt="" />
          <h1 className="price hide">$3</h1>
        </div>
      </div>
      <div className="checkout-zone">
        <h1>cart</h1>
        <div id="cart-zone" className="dropzone"></div>
        <button id="checkout-button" onClick={() => logCart()} type="submit">
          <h1>checkout</h1>
        </button>
      </div>
    </div>
  );
}

export default App;
