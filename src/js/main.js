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
const maskFormPhone = document.getElementById('formPhone')
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
  }, false)
})

// Form
document.getElementById('formModal').onsubmit = function(){
  let http = new XMLHttpRequest()
  http.open('POST', 'mail.php', true)
  http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  http.send('nameFF=' + this.nameFF.value + '&contactFF=' + this.contactFF.value + '&messageFF=' + this.messageFF.value)
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      alert(http.responseText + ', Ваша заявка отправлена.\nНаши специалисты ответят Вам в ближайшее время.')
    }
  }
  http.onerror = function() {
    alert('Извините, данные не были переданы')
  }
  return false;
}
