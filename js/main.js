const query = document.querySelector('.query');
const search = document.querySelector('.search');
const random = document.querySelector('.random');
const logo = document.querySelector('.logo');
const header = document.querySelector('.header');
const copyright = document.querySelector('.copyright');

window.onload = function() {
  document.querySelector('input[name="search"]').focus();
  return;
}

function toggleClass(e) {
  header.classList.add('headerAfter');
  logo.classList.add('logoAfter');
  search.classList.add('searchAfter');
  random.classList.add('luckyAfter');
  copyright.style.display = 'none';
}

function requestWiki(searchTerm) {
  const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm;
  const callback = '&format=json&callback=?'

  return new Promise((resolve, reject) => {
    fetchJsonp(url)
      .then(response => {
        return resolve(response.json())
      })
      .catch(error => {
        return reject(error);
      })
  })
}

function clearPrevious() {
  const previousResults = document.querySelectorAll('.result');
  Array.from(previousResults).forEach(previousResult => {
    previousResult.parentNode.removeChild(previousResult);
  })
}

function searchQuery() {
  const queryValue = query.value;
  requestWiki(query.value)
  .then(response => {
    const keywords = response[1].slice(1);
    const descriptions = response[2].slice(1);
    const links = response[3].slice(1);

    keywords.forEach((keyword, index) => {
      const result = document.createElement('div');
      // append title
      result.className= 'result';
      const title = document.createElement('div');
      const anchor = document.createElement('a');
      anchor.textContent = keyword;
      title.appendChild(anchor);
      title.className = 'title';
      anchor.setAttribute('href', links[index]);
      result.appendChild(title);

      // append link text
      const linkText = document.createElement('div');
      linkText.textContent = links[index];
      linkText.className = 'link';
      result.appendChild(linkText);

      // append description
      const description = document.createElement('div');
      description.className = 'description';
      description.textContent = descriptions[index];
      result.appendChild(description);

      // append finished result card to body
      document.body.appendChild(result);
    })
  })
}