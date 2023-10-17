const btn = document.querySelector(".contact_button");
const modal = document.querySelector("#contact_modal");
const close = document.querySelector(".close-btn");
btn.addEventListener("click", () => {
  modal.showModal();
});

close.addEventListener("click", () => {
  modal.close();
});

function validate() {}
