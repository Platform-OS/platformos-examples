const _form = document.querySelector('[data-s3-uppy="form"]');
const _log = document.querySelector('[data-s3-uppy="log"]');

const uppy = Uppy.Core({
  autoProceed: true,
  restrictions: {
    maxFileSize: 2097152,
    maxNumberOfFiles: 3,
    allowedFileTypes: ['image/*', 'image/webp']
  }
})
  .use(Uppy.Dashboard, {
    inline: true,
    target: '#drag-drop-area',
    replaceTargetContent: true,
    showProgressDetails: true,
    showLinkToFileUploadResult: false,
    note: 'Images only, up to 3 files, 2MB each',
    width: '100%',
    height: 350,
    proudlyDisplayPoweredByUppy: true
  })
  .use(Uppy.DragDrop)
  .use(Uppy.GoldenRetriever)
  .use(Uppy.AwsS3, {
    getUploadParameters() {
      const _url = _form.getAttribute('action');
      const _formDataArray = Array.from(new FormData(_form));
      const _fields = _formDataArray.reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});

      return Promise.resolve({
        method: 'POST',
        url: _url,
        fields: _fields
      });
    }
  });

uppy.on('upload-success', (file, data) => {
  const li = document.createElement('li');
  li.textContent = data.body.location;

  _log.appendChild(li);
});

uppy.on('complete', ({ failed, successful }) => {
  Promise.all(successful.map(({ response }) => createImage(response.body.location))).then(() => {
    Swal.fire({
      title: 'Images uploaded',
      type: 'success',
      text: 'Press refresh to see the results',
      confirmButtonText: 'Refresh',
      showCloseButton: true
    }).then(result => {
      if (!result.value) {
        return;
      }

      window.location.reload();
    });
  });
});

const createImage = imageUrl => {
  return fetch('/update_profile/advanced/create_model', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ direct_url: imageUrl })
  }).then(response => response.json());
};
