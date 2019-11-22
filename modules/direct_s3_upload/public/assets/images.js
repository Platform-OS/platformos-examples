const _form = document.querySelector('[data-s3-uppy="form"]');
const _log = document.querySelector('[data-s3-uppy="log"]');

const uppy = Uppy.Core({
  autoProceed: true,
  restrictions: {
    maxFileSize: 2097152,
    maxNumberOfFiles: 3,
    allowedFileTypes: ['image/png', 'image/jpeg', 'image/webp']
  }
})
  .use(Uppy.Dashboard, {
    inline: true,
    target: '#drag-drop-area',
    note: 'Images only, up to 3 files, 2MB each',
    width: '100%',
    height: 350
  })
  .use(Uppy.DragDrop)
  .use(Uppy.GoldenRetriever)
  .use(Uppy.AwsS3, {
    getUploadParameters() {
      // 1. Find form where presign data has been saved in data attribute
      const _url = _form.getAttribute('action');
      // 2. Create Array from formdata object to make it easy to operate on the data
      const _formDataArray = Array.from(new FormData(_form));
      // 3. Create a JSON object from array
      const _fields = _formDataArray.reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});

      // 4. Return resolved promise with Uppy - it will add file in file param
      return Promise.resolve({
        method: 'POST',
        url: _url,
        fields: _fields
      });
    }
  });

uppy.on('upload-success', (_file, data) => {
  const li = document.createElement('li');
  li.textContent = data.body.location;
  _log.appendChild(li);
});

uppy.on('complete', ({ failed, successful }) => {
  /*
    For every successfully uploaded image to s3, send request to the instance
    that will create model with uploaded image url as direct_url param.
  */
  Promise.all(successful.map(({ response }) => createImage(response.body.location)))
  .then(() => {
    // Show confirmation box after all the images has been created
    Swal.fire({
      title: 'Images uploaded',
      icon: 'success',
      text: 'Press refresh to see the results',
      confirmButtonText: 'Refresh',
      showCloseButton: true
    }).then(result => {
      if (!result.value) {
        return;
      }

      // Reload page after "Refresh" button has been clicked inside Sweet Alert2
      window.location.reload();
    });
  });
});

const createImage = imageUrl => {
  // Get logged in user id
  const userId = _form.dataset.s3UppyUserId;

  // Create model for this user with s3 image url
  return fetch('/direct-s3-upload/images/model_create', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ direct_url: imageUrl, user_id: userId })
  }).then(response => response.json());
};
