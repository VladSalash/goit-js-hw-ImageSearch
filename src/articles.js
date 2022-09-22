

export function articlesTpl(hits) {
  return hits.map(({webformatURL,largeImageURL,tags,likes, views, comments, downloads }) => {
   return `
              <div  class="photo-card">
                  <a class= "photo-link" href="${largeImageURL}">
                  <img class="photo-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                  </a>
                    <div class="info">
                    <p class="info-item">
                      <b>Likes: ${likes}</b>
                    </p>
                    <p class="info-item">
                      <b>Views: ${views}</b>
                    </p>
                    <p class="info-item">
                      <b>Comments: ${comments}</b>
                    </p>
                    <p class="info-item">
                      <b>Downloads: ${downloads}</b>
                    </p>
                  </div>
              </div>
        `
 }).join('');
}




// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.
