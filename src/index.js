
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
const loadMore = document.querySelector('.load-more');

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener("click", onLoadMore);



// SUBMIT FUNCTION ON_SEARCH //
function onSearch(e) {
  e.preventDefault()

  newsApiService.sQuery = e.currentTarget.elements.searchQuery.value;

  if (newsApiService.sQuery === '') {
  return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }


  loadMoreBtn.show();
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
  loadMoreBtn.disable();
  const res = await newsApiService.fetchArticles()
    appendArticlesMarkup(res.hits);
  console.log(newsApiService.page);
  if (newsApiService.page === 2) {
     Notify.success(`Hooray! We found ${res.totalHits} images.`);
  }
    if (res.hits.length < 40) {
      loadMore.classList.add('is-hidden');
      return Notify.warning("We're sorry, but you've reached the end of search results.");
    }
    loadMoreBtn.enable();
return res
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
