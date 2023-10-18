const btn = document.querySelector(".contact_button");
const modal = document.querySelector("#contact_modal");
const close = document.querySelector(".close-btn");
btn.addEventListener("click", () => {
  modal.showModal();
});

close.addEventListener("click", () => {
  modal.close();
});

function displayError(inputId, errorMessage) {
  const inputElement = document.getElementById(inputId);
  inputElement.parentElement.setAttribute("data-error", errorMessage);
  inputElement.parentElement.setAttribute("data-error-visible", "true");
  inputElement.classList.add("error-input");
}

// fonction qui va enlever l'erreur lorsque les conditions de l'input seront remplis
function removeError(inputId) {
  const inputElement = document.getElementById(inputId);
  inputElement.parentElement.removeAttribute("data-error");
  inputElement.parentElement.removeAttribute("data-error-visible");
  inputElement.classList.remove("error-input");
}

// reset le style des erreurs, enlever l'attribut et le status visible de l'erreur
function resetErrorStyles() {
  const errorElements = document.querySelectorAll("[data-error]");
  errorElements.forEach((element) => {
    element.removeAttribute("data-error");
    element.removeAttribute("data-error-visible");
  });

  const inputElements = document.querySelectorAll(".error-input");
  inputElements.forEach((element) => {
    element.classList.remove("error-input");
  });
}

// fonction verifiant tous les parametres des inputs
function checkForm(e) {
  e.preventDefault();

  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  let isValid = true;

  resetErrorStyles();

  if (
    firstName.value.trim().length < 2 ||
    !/^[A-Za-z]+$/.test(firstName.value.trim())
  ) {
    displayError(
      "first",
      "Veuillez entrer un prénom valide avec au moins 2 caractères alphabétiques."
    );
    isValid = false;
  }

  if (
    message.value.trim().length < 2 ||
    !/^[A-Za-z]+$/.test(message.value.trim())
  ) {
    displayError(
      "message",
      "Veuillez entrer un message valide avec au moins 2 caractères alphabétiques."
    );
    isValid = false;
  }

  if (
    lastName.value.trim().length < 2 ||
    !/^[A-Za-z]+$/.test(lastName.value.trim())
  ) {
    displayError(
      "last",
      "Veuillez entrer un nom valide avec au moins 2 caractères alphabétiques."
    );
    isValid = false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (
    !emailPattern.test(email.value.trim()) ||
    email.value.trim().split("@").length !== 2
  ) {
    displayError("email", "Veuillez entrer une adresse email valide.");
    isValid = false;
  }
  if (isValid) {
    displaySuccessMessage();
  }
}
const submitBtn = document.querySelector(".contact-button");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkForm(e);
});

// const displaySuccessMessage = () => {
//   const successContainer = document.querySelector(".success");
//   const btnClose = document.querySelector(".btn-close");
//   const formData = document.querySelectorAll(".formData");
//   const reserveForm = document.querySelector("form[name='reserve']");
//   successContainer.style.display = "block";
//   document.querySelector(".contact-button").style.display = "none";
//   formData.forEach((form) => {
//     form.style.display = "none";
//   });
//   btnClose.addEventListener("click", () => {
//     formData.forEach((form) => {
//       form.style.display = "block";
//       form.value = "";
//     });
//     successContainer.style.display = "none";
//     document.querySelector(".contact-button").style.display = "block";
//     reserveForm.reset();
//     modal.close();
//   });
// };

const displaySuccessMessage = () => {
  const successContainer = document.querySelector(".success");
  const btnClose = document.querySelector(".btn-close");
  const formData = document.querySelectorAll(".formData");
  const reserveForm = document.querySelector("form[name='reserve']");
  successContainer.style.display = "block";
  document.querySelector(".contact-button").style.display = "none";
  formData.forEach((form) => {
    form.style.display = "none";
  });
  btnClose.addEventListener("click", () => {
    formData.forEach((form) => {
      form.style.display = "block";
      const inputElement = form.querySelector("input, textarea");
      if (inputElement) {
        inputElement.value = "";
      }
    });
    successContainer.style.display = "none";
    document.querySelector(".contact-button").style.display = "block";
    reserveForm.reset();
    modal.close();
  });
};
