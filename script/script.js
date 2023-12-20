document.addEventListener("DOMContentLoaded", function () {
  var openModalButton = document.getElementById("openModalButton");
  var closeModalButton = document.getElementById("closeModalButton");
  var modal = document.getElementById("myModal");
  var orderForm = document.getElementById("orderForm");

  openModalButton.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;

    // Відправити дані на сервер
    fetch("./script/server.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    modal.style.display = "none";
  });
});
