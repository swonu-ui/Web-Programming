const BERRIES = ['Blackberry', 'Blueberry', 'Cloudberry', 'Cranberry', 'Elderberry', 'Gooseberry', 'Huckleberry', 'Mulberry', 'Raspberry', 'Salmonberry', 'Strawberry', 'Boysenberry', 'Loganberry', 'Goji berry'];

let query = '';
let results = [...BERRIES];

const berrySearch = document.getElementById('berrySearch');
const resultCount = document.getElementById('resultCount');
const berryList = document.getElementById('berryList');

const fetchResults = (q) => Promise.resolve(
  BERRIES.filter(berry => berry.toLowerCase().includes(q.trim().toLowerCase()))
);

async function handleSearch(value) {
  query = value;
  results = await fetchResults(query);
  renderResults();
}

function renderResults() {
  resultCount.textContent = `${results.length} result${results.length === 1 ? '' : 's'}${query ? ` for “${query}”` : ''}`;

  berryList.innerHTML = '';
  results.forEach(berry => {
    const item = document.createElement('li');
    item.textContent = berry;
    berryList.appendChild(item);
  });
}

berrySearch.addEventListener('input', event => {
  handleSearch(event.target.value);
});

renderResults();
