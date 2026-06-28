const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

const bookingModal = document.getElementById("bookingModal");
const modalClose = document.getElementById("modalClose");
const modalServiceName = document.getElementById("modalServiceName");
const modalServicePrice = document.getElementById("modalServicePrice");
const modalTelegramLink = document.getElementById("modalTelegramLink");

const serviceButtons = document.querySelectorAll(".service-btn");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const telegramBotUrl = "https://t.me/hotelsupport01_bot";

burgerBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("active");
});

mobileMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
  });
});

serviceButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const serviceName = button.dataset.service;
    const servicePrice = button.dataset.price;

    modalServiceName.textContent = serviceName;
    modalServicePrice.textContent = `от ${formatPrice(servicePrice)} ₽`;

    const startParam = `beauty_${serviceName.toLowerCase()}`;
    modalTelegramLink.href = `${telegramBotUrl}?start=${encodeURIComponent(startParam)}`;

    bookingModal.classList.add("active");
  });
});

modalClose.addEventListener("click", function () {
  bookingModal.classList.remove("active");
});

bookingModal.addEventListener("click", function (event) {
  if (event.target === bookingModal) {
    bookingModal.classList.remove("active");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    bookingModal.classList.remove("active");
  }
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const service = document.getElementById("clientService").value;

  if (!name || !phone || !service) {
    formMessage.textContent = "Заполните имя, телефон и выберите услугу.";
    return;
  }

  formMessage.textContent = "Заявка подготовлена. Для демо-версии подключите отправку в Telegram.";

  contactForm.reset();
});

function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(Number(price));
}
