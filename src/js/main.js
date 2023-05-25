import '../scss/app.scss'

// Bootstrap
import * as bootstrap from 'bootstrap'
import backdrop from "bootstrap/js/src/util/backdrop";

// Nav scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener('click', function(e) {
    e.preventDefault();

    let href = this.getAttribute('href').substring(1)

    const scrollTarget = document.getElementById(href)

    // const topOffset = document.querySelector('.navbar').offsetHeight
    const topOffset = 16
    const elementPosition = scrollTarget.getBoundingClientRect().top
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    })
  })
})

// Close navbar
const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasNavbar')
const offcanvasLinkAll = document.querySelectorAll('#offcanvasNavbar .nav-link')
offcanvasLinkAll.forEach(elem => {
  elem.addEventListener('click', () => {
    bsOffcanvas.hide('slow')
  })
})

// Modal image
const imgModal = document.getElementById('imgModal')
if (imgModal) {
  imgModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget

    const recipient = button.getAttribute('data-bs-title')
    const modalTitle = imgModal.querySelector('.modal-title')

    const modalBodyImage = imgModal.querySelector('.modal-body')
    const image = button.getAttribute('data-bs-src')

    modalTitle.textContent = `${recipient}`
    modalBodyImage.innerHTML = `<img class="modal__image mb-5" src="${image}" alt="${recipient}"><p class="modal__content">${recipient}</p>`
  })
}

// Form
var modal_init = function() {

  var modalWrapper = document.getElementById("modal_wrapper");
  var modalWindow  = document.getElementById("modal_window");

  var openModal = function(e)
  {
    modalWrapper.className = "overlay";
    var overflow = modalWindow.offsetHeight - document.documentElement.clientHeight;
    if(overflow > 0) {
      modalWindow.style.maxHeight = (parseInt(window.getComputedStyle(modalWindow).height) - overflow) + "px";
    }
    modalWindow.style.marginTop = (-modalWindow.offsetHeight)/2 + "px";
    modalWindow.style.marginLeft = (-modalWindow.offsetWidth)/2 + "px";
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  };

  var closeModal = function(e)
  {
    modalWrapper.className = "";
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  };

  var clickHandler = function(e) {
    if(!e.target) e.target = e.srcElement;
    if(e.target.tagName == "DIV") {
      if(e.target.id != "modal_window") closeModal(e);
    }
  };

  var keyHandler = function(e) {
    if(e.keyCode == 27) closeModal(e);
  };

  if(document.addEventListener) {
    document.getElementById("modal_open").addEventListener("click", openModal, false);
    document.getElementById("modal_close").addEventListener("click", closeModal, false);
    document.addEventListener("click", clickHandler, false);
    document.addEventListener("keydown", keyHandler, false);
  } else {
    document.getElementById("modal_open").attachEvent("onclick", openModal);
    document.getElementById("modal_close").attachEvent("onclick", closeModal);
    document.attachEvent("onclick", clickHandler);
    document.attachEvent("onkeydown", keyHandler);
  }

};
