'use strict'

// JS
import * as bootstrap from 'bootstrap'
import IMask from 'imask'
// SCSS
import '../scss/app.scss'


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


// Phone mask
const maskFormPhone = document.getElementById('staticContact')
const maskModalPhone = document.getElementById('modalPhone')
const maskOptions = {
  mask: '+{7} ({9}00) 000-00-00'
}
const mask1 = IMask(maskFormPhone, maskOptions)
const mask2 = IMask(maskModalPhone, maskOptions)


// Forms validation
const forms = document.querySelectorAll('.needs-validation')
Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    form.classList.add('was-validated')
    document.querySelector('#staticFormFeedback').addEventListener('submit', staticFormFeedback, false)
  }, false)
})


// Form
const formModal = new bootstrap.Modal(document.querySelector('#formModal'))
const successModal = new bootstrap.Modal(document.querySelector('#formSuccess'))
document.getElementById('modalFormFeedback').addEventListener('submit', function(e) {
  let xhr = new XMLHttpRequest()
  let f = this
  e.preventDefault()

  xhr.open('POST', 'https://form-perm.ru/mail.php', true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText)
      setTimeout(function() {
        formModal.hide()
      }, 500)
      setTimeout(function() {
        successModal.show()
        // f.nameFF.removeAttribute('value')
        // f.nameFF.value = ''
        // f.contactFF.removeAttribute('value')
        // f.contactFF.value = ''
      }, 1500)
    }
  }

  xhr.send('nameFF=' + f.nameFF.value + '&contactFF=' + f.contactFF.value + '&agreeFF=' + f.agreeFF.value)

}, false)


function staticFormFeedback(e) {
  let xhr = new XMLHttpRequest()
  let f = this
  e.preventDefault()
  xhr.open('POST', 'https://form-perm.ru/mail.php', true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send('staticNameFF=' + f.staticNameFF.value + '&staticContactFF=' + f.staticContactFF.value + '&staticCheckFF=' + f.staticCheckFF.value)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText)
      setTimeout(function() {
        successModal.show()
      }, 1500)
      document.querySelector('#staticFormFeedback').reset()
    }
  }
}


