/*
  We do not have to wait for page to be fully loaded to run with our script.
  We only need to know that containers are in the DOM and thats guaranteed by having
  script tag after all containers. If you want to have more guaratees, add `defer`
  to script tag - this way it will execute after body has been parsed.
*/

// Converting DOM collection to array to make it easier to iterate
const containers = Array.prototype.slice.call(document.querySelectorAll('[data-remote-content]') || []);

containers.forEach(function(container) {
  const url = container.dataset.remoteContent;
  console.log('Fetching: ', url);

  // Same operation we did in lazy-inline
  fetch(url)
    .then(function(res) {
      return res.text();
    })
    .then(function(html) {
      container.innerHTML = html;
    });
});
