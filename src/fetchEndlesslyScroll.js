import axios from 'axios';
///////////////////////////////////////////////////////////////////////
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  // FETCH_ARTICLES //
  async fetchArticles() {
    const API_KEY = 'key=29791445-a3e2bb5b00c4bcebfee57452f';
    const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';
    const BASE_URL = 'https://pixabay.com/api/';
// TRY____CATCH //
    try {
      const response = await axios.get(`${BASE_URL}?${API_KEY}&q=${this.searchQuery}&${OPTIONS}&per_page=40&page=${this.page}`);
      const data = await response.data
      this.incrementPage();
      console.log(response);
          return data
        console.log(response);
     }
    catch (error) {
      console.error(error);
      Notify.failure('Something went wrong, please try again...');
  }
}
// ///////////////////////////////////////////////////////////////////
// OPTIONS CLASS
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get sQuery() {
    return this.searchQuery;
  }
  set sQuery(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
// //////////////////////////////////////////////////////////////////
}
