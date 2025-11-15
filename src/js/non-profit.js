// nonprofit formlogic
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const progressCircles = document.querySelectorAll(".progress-step");

  let currentStep = 0;

  function updateStepDisplay() {
    steps.forEach((step, i) => {
      step.classList.toggle("hidden", i !== currentStep);
    });

    progressCircles.forEach((circle, i) => {
      if (i < currentStep) {
        circle.classList.add("bg-green-600", "text-white");
        circle.classList.remove("bg-gray-300", "text-gray-600");
      } else if (i === currentStep) {
        circle.classList.add("bg-green-600", "text-white");
        circle.classList.remove("bg-gray-300", "text-gray-600");
      } else {
        circle.classList.add("bg-gray-300", "text-gray-600");
        circle.classList.remove("bg-green-600", "text-white");
      }
    });
  }

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateStepDisplay();
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        updateStepDisplay();
      }
    });
  });

  updateStepDisplay();
});

document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  this.src = isPassword ? "./assets/icons/hide.png" : "./assets/icons/see.png";
});

document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.getElementById("uploadBtn");
  const fileInput = document.getElementById("einFile");
  const fileNameDisplay = document.getElementById("fileName");

  if (uploadBtn && fileInput && fileNameDisplay) {
    uploadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      fileInput.click();
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        fileNameDisplay.textContent = `Selected: ${fileName}`;
        fileNameDisplay.classList.remove("hidden");
      } else {
        fileNameDisplay.classList.add("hidden");
      }
    });
  }
});
