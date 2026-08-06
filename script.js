document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".stop-button").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const stop = button.closest(".route-stop");
      const willOpen = button.getAttribute("aria-expanded") !== "true";

      button.setAttribute("aria-expanded", String(willOpen));
      panel.hidden = !willOpen;
      stop.classList.toggle("open", willOpen);
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});
