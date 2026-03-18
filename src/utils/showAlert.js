export default function showAlert(message) {
  const alertBox = document.getElementById("alertBox");

  if (!alertBox) return;

  alertBox.textContent = message;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 2000);
}
