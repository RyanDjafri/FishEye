const displayModal = () => {
  const modal = document.getElementById("contact-modal");
  const btn = document.querySelector(".contact_button");
  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });
};
document.addEventListener("DOMContentLoaded", function () {
  displayModal();
});

function closeModal() {
  const modal = document.getElementById("contact-modal");
  modal.style.display = "none";
}

function validate() {}
