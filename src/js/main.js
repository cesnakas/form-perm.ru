import '../scss/app.scss'

// Bootstrap
import * as bootstrap from 'bootstrap'

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

