// script.js - JavaScript for Department of Mathematics and Computer Science Website

document.addEventListener("DOMContentLoaded", function () {
  // Form validation
  const applicationForm = document.getElementById("applicationForm");
  if (applicationForm) {
    applicationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation
      let isValid = true;
      const requiredFields = applicationForm.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("error");

          // Add error message if it doesn't exist
          let errorMessage = field.nextElementSibling;
          if (
            !errorMessage ||
            !errorMessage.classList.contains("error-message")
          ) {
            errorMessage = document.createElement("div");
            errorMessage.classList.add("error-message");
            errorMessage.textContent = "This field is required";
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
          }
        } else {
          field.classList.remove("error");

          // Remove error message if it exists
          const errorMessage = field.nextElementSibling;
          if (
            errorMessage &&
            errorMessage.classList.contains("error-message")
          ) {
            errorMessage.remove();
          }
        }
      });

      // Email validation
      const emailField = document.getElementById("email");
      if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.classList.add("error");

          // Add error message if it doesn't exist
          let errorMessage = emailField.nextElementSibling;
          if (
            !errorMessage ||
            !errorMessage.classList.contains("error-message")
          ) {
            errorMessage = document.createElement("div");
            errorMessage.classList.add("error-message");
            errorMessage.textContent = "Please enter a valid email address";
            emailField.parentNode.insertBefore(
              errorMessage,
              emailField.nextSibling
            );
          } else {
            errorMessage.textContent = "Please enter a valid email address";
          }
        }
      }

      // If form is valid, show success message
      if (isValid) {
        // Normally you would submit the form here
        // For this demo, we'll just show a success message
        const successMessage = document.createElement("div");
        successMessage.classList.add("success-message");
        successMessage.textContent =
          "Application submitted successfully! We will contact you soon.";

        // Remove any existing success message
        const existingSuccess =
          applicationForm.querySelector(".success-message");
        if (existingSuccess) {
          existingSuccess.remove();
        }

        applicationForm.prepend(successMessage);

        // Reset form
        applicationForm.reset();

        // Scroll to top of form
        applicationForm.scrollIntoView({ behavior: "smooth" });
      }
    });

    // Clear validation errors on input
    applicationForm
      .querySelectorAll("input, select, textarea")
      .forEach((field) => {
        field.addEventListener("input", function () {
          this.classList.remove("error");
          const errorMessage = this.nextElementSibling;
          if (
            errorMessage &&
            errorMessage.classList.contains("error-message")
          ) {
            errorMessage.remove();
          }
        });
      });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add active class to current navigation item
  const currentPath = window.location.pathname;
  document.querySelectorAll("nav ul li a").forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (currentPath.endsWith(linkPath)) {
      link.classList.add("active");
    }
  });

  // Additional styling for form
  const formStylesheet = document.createElement("style");
  formStylesheet.textContent = `
        .error {
            border-color: #e74c3c !important;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 5px;
        }
        
        .success-message {
            background-color: #27ae60;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            animation: fadeIn 0.5s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
  document.head.appendChild(formStylesheet);
});

// Complete the gallery page with a lightbox feature
function setupGallery() {
  const galleryImages = document.querySelectorAll(".gallery-image");

  if (galleryImages.length > 0) {
    // Create lightbox elements
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");

    const lightboxContent = document.createElement("div");
    lightboxContent.classList.add("lightbox-content");

    const lightboxImage = document.createElement("img");
    lightboxImage.classList.add("lightbox-img");

    const lightboxCaption = document.createElement("div");
    lightboxCaption.classList.add("lightbox-caption");

    const closeButton = document.createElement("span");
    closeButton.classList.add("lightbox-close");
    closeButton.innerHTML = "&times;";

    // Append elements to DOM
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(lightboxCaption);
    lightboxContent.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);

    // Add click event to gallery images
    galleryImages.forEach((img) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", function () {
        lightbox.style.display = "flex";
        lightboxImage.src = this.src;

        // Get caption from parent's caption element
        const caption = this.closest(".gallery-item").querySelector(
          ".gallery-caption h3"
        ).textContent;
        lightboxCaption.textContent = caption;

        // Disable body scroll
        document.body.style.overflow = "hidden";
      });
    });

    // Close lightbox on button click
    closeButton.addEventListener("click", function () {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    // Add lightbox styles
    const lightboxStyles = document.createElement("style");
    lightboxStyles.textContent = `
            .lightbox {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 2000;
                justify-content: center;
                align-items: center;
                animation: fadeIn 0.3s;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                animation: zoomIn 0.3s;
            }
            
            .lightbox-img {
                max-width: 100%;
                max-height: 80vh;
                display: block;
                border: 3px solid white;
                border-radius: 5px;
            }
            
            .lightbox-caption {
                color: white;
                text-align: center;
                padding: 15px;
                font-size: 1.2rem;
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 40px;
                font-weight: bold;
                cursor: pointer;
            }
            
            @keyframes zoomIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
    document.head.appendChild(lightboxStyles);
  }
}

// Call the gallery setup function when DOM is loaded
document.addEventListener("DOMContentLoaded", setupGallery);
