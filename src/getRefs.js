export function getRefs() {
  return {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input[name="searchQuery"]'),
    searchBtn: document.querySelector('button[type="submit"]')
  }
}