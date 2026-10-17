"use strict";

// تحديث السنة تلقائيًا
document.querySelectorAll(".current-year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// قائمة التنقل على الموبايل
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// قراءة الخدمة المختارة من رابط صفحة الخدمات
const serviceSelect = document.querySelector("#clientService");

if (serviceSelect) {
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get("service");

  const serviceMap = {
    identity: "هوية بصرية",
    social: "تصميم سوشيال ميديا",
    editorial: "مطبوعات وتصميم تحريري"
  };

  if (serviceMap[requestedService]) {
    serviceSelect.value = serviceMap[requestedService];
  }
}

// إرسال تفاصيل المشروع من خلال واتساب
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const details = String(formData.get("details") || "").trim();

    if (!name || !service || !details) {
      return;
    }

    const message = [
      "أهلًا LOAI، عندي مشروع جديد.",
      "",
      `الاسم: ${name}`,
      `الخدمة: ${service}`,
      `تفاصيل المشروع: ${details}`
    ].join("\n");

    const whatsappURL =
      "https://wa.me/201019959333?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}
/* LOAI — Scroll Reveal */

const revealTargets = document.querySelectorAll(
  "main > section, .service-item, .service-card, " +
  ".project-card, .process-item, .contact-link"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealTargets.forEach((element) => {
    element.classList.add("js-reveal");
    revealObserver.observe(element);
  });
} else {
  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
}