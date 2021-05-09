
import gallery from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryMarkUp (gallery);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

const lightboxEl = document.querySelector('.lightbox');
const lightboxElImg = document.querySelector('.lightbox__image');
const galleryOverlay = document.querySelector('.lightbox__overlay');

const itemClose = document.querySelector('button[data-action="close-lightbox"]');

galleryContainer.addEventListener('click', onClickPictureContainerOpen);
itemClose.addEventListener('click', onCloseModal);
galleryOverlay.addEventListener('click', onOverlayClose);


function createGalleryMarkUp (gallery) {
  return gallery
  .map(({ preview,  original, description }) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
}).join('');
}


function onClickPictureContainerOpen (event) {
  event.preventDefault();

  if( !event.target.classList.contains('gallery__image')) {
    return;
  }
  window.addEventListener('keydown', onEscClose);
  window.addEventListener('keydown', onArrowNext);

     lightboxEl.classList.add('is-open'); 
     lightboxElImg.src = event.target.dataset.source;
     lightboxElImg.alt = event.target.alt;
}

function onCloseModal(event) {
  window.removeEventListener('keydown', onEscClose);
  window.removeEventListener('keydown', onArrowNext);

    lightboxEl.classList.remove('is-open');
    lightboxElImg.src = '';
    lightboxElImg.alt = '';
}

function onOverlayClose(event) {
  
  if(event.target === event.currentTarget)
  onCloseModal();
}

function onEscClose(event) {

if(event.code === 'Escape') {
  onCloseModal();
  }
}

function onArrowNext (event) {
  const imgArreyMove = gallery.map(image => image.original);
  const imgCurrentIndex = imgArreyMove.indexOf(lightboxElImg.src);

  if(event.code === 'ArrowRight') {
    if (imgCurrentIndex < imgArreyMove.length - 1)
    lightboxElImg.src = imgArreyMove[Number(imgCurrentIndex) + 1];
  }

  if(event.code === 'ArrowLeft') {
    if (imgCurrentIndex > 0 ) {
      lightboxElImg.src = imgArreyMove[Number(imgCurrentIndex) -1 ];
    }
  }
}
