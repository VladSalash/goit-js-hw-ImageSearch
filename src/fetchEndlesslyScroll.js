// const axios = require('axios').default;
// const API_KEY = '29791445-a3e2bb5b00c4bcebfee57452f';
// const URL = `https://pixabay.com/api/key=${API_KEY}&q=`;
// const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&${OPTIONS}&page=${this.page}`;
// const OPTIONS = 'image_type=photo&orientation&safesearch';


export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;

  }
  async getFetchRequest() {
    const API_KEY = '29791445-a3e2bb5b00c4bcebfee57452f';
    const OPTIONS = 'image_type=photo&orientation&safesearch';
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&${OPTIONS}&page=${this.page}`;
  try {
    const response = await axios.get(URL);
    const data = await response.data;
    const photos = await this.getArrayOfPhoto
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}


  resetPage() {
    this.page = 1;
  }

}
