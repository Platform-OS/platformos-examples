const _form = document.querySelector('[data-s3-uppy="form"]');
const _log = document.querySelector('[data-s3-uppy="log"]');

const uppy = Uppy.Core({
  autoProceed: true,
  restrictions: {
    maxFileSize: 1000000,
    maxNumberOfFiles: 5,
    allowedFileTypes: ['image/*', 'video/*']
  }
})
  .use(Uppy.Dashboard, {
    inline: true,
    target: '#drag-drop-area',
    replaceTargetContent: true,
    showProgressDetails: true,
    showLinkToFileUploadResult: false,
    note: 'Images and video only, up to 5 files and 1MB',
    width: '100%',
    height: 350,
    proudlyDisplayPoweredByUppy: true,
  })
  .use(Uppy.DragDrop)
  .use(Uppy.GoldenRetriever)
  .use(Uppy.AwsS3, {
    getUploadParameters() {
      const _url = _form.getAttribute('action');
      const _formDataArray = Array.from(new FormData(_form));
      const _fields = _formDataArray.reduce((acc, cur) => ({...acc, [cur[0]]: cur[1] }), {});

      return {
        method: "POST",
        url: _url,
        fields: _fields
      };
    }
  });

  uppy.on('upload-success', (file, data) => {
    const li = document.createElement('li');
    li.textContent = data.body.location;

    _log.appendChild(li);
  });