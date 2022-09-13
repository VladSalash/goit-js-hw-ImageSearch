const KEY = '';
const URL = '';
const OPTIONS = '';


export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;

  }

  // fetchCountries(name) {
  //   return fetch(`${URL}${name}?${SEARCH_OPTIONS}`)
  //     .then((response) => {
  //       if (!response.ok || response.status === 404) {
  //         throw new Error(response.status);
  //       }
  //       return response.json();
  //     }
  //     );
  // }


  resetPage() {
    this.page = 1;
  }

}
