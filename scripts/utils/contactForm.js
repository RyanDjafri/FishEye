const displayModal = () => {
  const modal = document.querySelector("#contact_modal");
  const btn = document.querySelector(".contact_button");
  btn.addEventListener("click", () => {
    modal.showModal();
  });
};
document.addEventListener("DOMContentLoaded", function () {
  displayModal();
  closeModal();
});

function closeModal() {
  const modal = document.querySelector("#contact_modal");
  const close = document.querySelector(".close");

  close.addEventListener("click", () => {
    modal.close();
  });
}

function validate() {}
