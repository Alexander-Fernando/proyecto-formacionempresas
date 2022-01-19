const stripe = Stripe(
  "pk_test_51JMQNNHBhPzIMtZfwaKeMn0XXrfCMdfjnybmDVpHr8Cbz9lnyZGlyzRoZQBMIkg1kAUHzbz1G2PYDD6Y2kgvu1Zw00pQFMtvE5"
);

const purchaseButton = document.querySelector(".comprarButton");

if(purchaseButton){
  purchaseButton.addEventListener("click", initPayment);
}

function initPayment() {
  const carritoCompras = localStorage.getItem("carrito");
  fetch("/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: carritoCompras,
  })
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      var elements = stripe.elements();
      var style = {
        base: {
          color: "#32325d",
          fontFamily: "Arial, sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d",
          }
        },
        invalid: {
          fontFamily: "Arial, sans-serif",
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      };

      const card = elements.create("card", {
        style: style,
      });

      // Stripe injects an iframe into the DOM
      card.mount("#card-element");

      //submit button
      const submitButton = document.querySelector("#submit");
      submitButton.disabled = true;

      card.on("change", function (event) {

        if (event.error) {
          submitButton.disabled = true;
        } else {
          submitButton.disabled = false;
        }
      });

      submitButton.addEventListener("click", function () {
        payWithCard(stripe, card, data.clientSecret);
      });
    });
}

var payWithCard = function (stripeAux, card, clientSecret) {
  loading(true);
  stripeAux
    .confirmCardPayment(clientSecret, {
      receipt_email: document.querySelector('#email-element').value.trim(),
      payment_method: {
        card: card,
      },
    })
    .then(function (result) {
      if (result.error) {
        showError(result.error.message);
      } else {
        try {
          guardarCompraDB();
          orderComplete();
        } catch (error) {
          console.log(error)
        }
      }
    });
};

/* ------- UI helpers ------- */
// Shows a success message when the payment is complete
var orderComplete = function () {
  loading(false);
  document.querySelector(".result-message").classList.remove("hidden");
  document.querySelector("#submit").disabled = true;
  document.getElementById("comprarModalLabel").innerText =
    "Gracias por su compra.";
};
// Show the customer the error from Stripe if their card fails to charge
var showError = function (errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function () {
    errorMsg.textContent = "";
  }, 4000);
};
// Show a spinner on payment submission
var loading = function (isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};

function guardarCompraDB(){
  const email = document.querySelector('#email-element').value.trim()
  const carroProductos = localStorage.getItem('carrito');

  const datosEnviar = {
    email,
    productos: JSON.parse(carroProductos),
  }

  fetch('/compra', {
    method : "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosEnviar)
  })
  .then(result => {
    console.log("RESULT: ", result)
    return result.json();
  })
  .then((res) => console.log(res))
  .then(console.log("ACÁ SE TIENE QUE VACIAR EL CARRITO DE COMRPAS"))
}
