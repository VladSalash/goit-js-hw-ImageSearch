
//////////////////////////////////////////////////////
// IMPORT //
import './css/common.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import NewsApiService from './fetchEndlesslyScroll.js';
import LoadMoreBtn from './load-more-btn'

import {getRefs} from './getRefs.js';
import {articlesTpl} from './articles.js';
/////////////////////////////////////////////////////
// IMPORT___FILES //


const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener("click", onLoadMore);



// SUBMIT FUNCTION ON_SEARCH //
function onSearch(e) {
  e.preventDefault()

  newsApiService.sQuery = e.currentTarget.elements.searchQuery.value.trim();

 if (newsApiService.sQuery === '' ) {
    Notify.failure('Something went wrong, please try again...');
    return
  }

  newsApiService.resetPage();
  clearArticlesContent()
  fetchArticles();
}
// BTN__ON_LOAD_MORE//
function onLoadMore() {
  fetchArticles();

  // scrollBy();
}
// FETCH_ARTICLES
async function fetchArticles() {
  // loading.disabled()
  const res = await newsApiService.fetchArticles()
  console.log(newsApiService.page);
  // CHECKING FOR BAD REQUEST //
  if (res.totalHits === 0) {
    loadMoreBtn.disable()
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  appendArticlesMarkup(res.hits);
  loadMoreBtn.show();
  // CHECKING END OF COLLECTION /
  const sitePage = newsApiService.page;
  const rounding = Math.ceil(res.totalHits / 40);
  if (sitePage >= rounding) {
     loadMoreBtn.hide();
  Notify.info("We're sorry, but you've reached the end of search results.");
    return;
}

// CHECKING THE NUMBER OF IMAGES FOUND //
if (newsApiService.page === 2) {
  Notify.success(`Hooray! We found ${res.totalHits} images.`);
  // return;
  }

  loadMoreBtn.enable();
  return res;
}

// RENDERING MARKUP //
function appendArticlesMarkup(hits) {
  refs.cardGallery.insertAdjacentHTML('beforeend', articlesTpl(hits));

  const options = {
  simpleLightBox: {
    // captions: true,
    captionPosition: 'bottom',
    navText: ['<', '>'],
    captionsData: 'alt',
    captionDelay: 250,
  }
}
  let gallerySimpleLightBox = new SimpleLightbox('.gallery  a', options.simpleLightBox);
  gallerySimpleLightBox.refresh();



}
// RESET //
function clearArticlesContent() {
  refs.cardGallery.innerHTML = '';
}


// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
