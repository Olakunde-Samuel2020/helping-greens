document.addEventListener("DOMContentLoaded", () => {
  // List all components you want to load
  const components = {
    navbar: "partials/navbar.html",
    footer: "partials/footer.html",
    sidebar: "partials/sidebar-nonprofit.html",
    donorsNavbar: "partials/navbar-donors.html",
    footerTwo: "partials/footerTwo.html",
    footerThree: "partials/footerThree.html",
    adminNav: "partials/admin-nav.html",
  };

  // Load all components
  Object.entries(components).forEach(([id, file]) => loadComponent(id, file));
});

// Generalized loader
function loadComponent(id, file) {
  fetch(file)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      return res.text();
    })
    .then((html) => {
      const container = document.getElementById(id);
      if (!container) return console.warn(`Container #${id} not found`);
      container.innerHTML = html;

      // Try to load matching JS file (optional)
      const scriptPath = file.replace(".html", ".js");
      loadComponentScript(scriptPath, id);
    })
    .catch((err) => console.error(err));
}

// Optional JS loader for each component
function loadComponentScript(scriptPath, id) {
  fetch(scriptPath)
    .then((res) => {
      if (!res.ok) return; // silently skip if no JS file
      const script = document.createElement("script");
      script.src = scriptPath;
      script.onload = () => {
        console.log(`${id} script loaded`);
        if (typeof window[`init${capitalize(id)}Events`] === "function") {
          window[`init${capitalize(id)}Events`](); // auto-run init if exists
        }
      };
      document.body.appendChild(script);
    })
    .catch(() => {});
}

// Helper: capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Sidebar toggle logic
  document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebar-toggle");
    const closeBtn = document.getElementById("close-sidebar");

    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
    });

    closeBtn.addEventListener("click", () => {
      sidebar.classList.add("-translate-x-full");
    });
  });

  function logout() {
    alert("Logging out...");
    window.location.href = "index.html";
  }

// ✅ Dynamic Hamburger Menu Logic (works for all loaded navbars)
document.addEventListener("click", (e) => {
  // Check if the click is on a hamburger button
  if (e.target.closest("#menu-toggle")) {
    const navLinks = document.querySelector("#nav-links");
    if (navLinks) {
      navLinks.classList.toggle("hidden");
    }
  }
});
// ✅ Highlight Active Sidebar Link
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".sidebar-link");

  links.forEach(link => {
    const page = link.getAttribute("data-page");
    if (page === currentPage) {
      link.classList.add("bg-green-100", "font-semibold", "text-green-700");
    } else {
      link.classList.remove("bg-green-100", "font-semibold", "text-green-700");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // ====== ALERT COMPONENT ======
  const alertContainer = document.getElementById("alert");

  function showAlert(message, type = "success") {
    const colors = {
      success: "bg-green-100 text-green-700 border-green-200",
      warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
      error: "bg-red-100 text-red-700 border-red-200",
    };

    alertContainer.innerHTML = `
      <img src="./assets/icons/check.png" class="w-5 h-5" alt="">
      <p class="text-sm font-medium">${message}</p>
    `;
    alertContainer.className = `px-4 py-3 flex items-center gap-3 rounded-lg border transition-all duration-300 ${colors[type]}`;
    alertContainer.style.display = "flex";

    // Auto-hide after 5s
    setTimeout(() => {
      alertContainer.style.display = "none";
    }, 5000);
  }

  // Example usage (for test):
  // showAlert("Great! We deliver fresh greens to you!", "success");


  // ====== PRODUCT CHOICE SELECTION ======
  const plans = document.querySelectorAll("#plan1, #plan2");
  const summaryPlan = document.querySelector("aside p:first-child"); // {Plan}
  const summaryValue = document.querySelector("aside p:nth-child(2)"); // {value based on subscription}

  plans.forEach(plan => {
    plan.addEventListener("click", () => {
      // Remove active state from all
      plans.forEach(p => p.classList.remove("border-double", "border-4", "border-green-600", "bg-green-50"));

      // Add active styles
      plan.classList.add("border-double", "border-4", "border-green-600", "bg-green-50");

      // Extract plan data
      const title = plan.querySelector("h5").textContent;
      const price = plan.querySelector("h4").textContent;

      // Update summary
      summaryPlan.textContent = title;
      summaryValue.textContent = price;
    });
  });


  // ====== FREQUENCY UPDATER ======
  const frequencySelect = document.querySelector("select");
  const frequencySummary = document.querySelectorAll("aside p")[3]; // Frequency summary line

  frequencySelect.addEventListener("change", () => {
    frequencySummary.textContent = frequencySelect.value;
  });


  // ====== ALERT LOGIC FOR ADDRESS FIELD ======
  const addressInput = document.getElementById("d-address");
  addressInput.addEventListener("blur", () => {
    const address = addressInput.value.trim();

    if (!address) {
      showAlert("Please enter a delivery address.", "warning");
    } else if (address.toLowerCase().includes("lagos")) {
      showAlert("Great! We deliver fresh greens to your location!", "success");
    } else {
      showAlert("Sorry, delivery not available in your area yet.", "error");
    }
  });
});
