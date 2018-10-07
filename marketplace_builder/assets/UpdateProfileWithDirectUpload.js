const qa = s => Array.prototype.slice.call(document.querySelectorAll(s));
const q = s => document.querySelector(s);
// prettier-ignore
const getXMLText = (data, key) => $(data).find(key).text() || '';

class FileUpload {
  constructor({ name }) {
    if (!name) {
      console.error('Missing name argument.');
      return false;
    }

    this.name = name;

    this.fileInput = q(`[data-s3-direct-upload-field-input="${this.name}"]`);
    this.presignFields = qa('[data-s3-direct-upload-field="presign"]');

    this.form = $(this.fileInput).closest('form');
    this.action = this.form.find('[name="action"]').val();
    this.fileUrl = q(`[data-s3-direct-upload-field-file-url="${this.name}"]`);
    this.progress = this.form.find(`[data-s3-direct-upload-progress="${this.name}"]`);
    this.previewContainer = this.form.find(`[data-s3-direct-upload-field-preview="${this.name}"]`);

    this.attachEventHandlers();
  }

  onFileChange() {
    this.sendForm()
      .done(this.updateFileUrl.bind(this)) // save path to uploaded file in db
      .done(this.disableFileInput.bind(this)) // do not submit files in form, since they are not used
      .done(this.updatePreview.bind(this)) // update preview to show what has been uploaded to s3
      .always(() => (this.showProgressBar = false));
  }

  attachEventHandlers() {
    $(this.fileInput).on('change', this.onFileChange.bind(this));
  }

  updateFileUrl(data) {
    this.fileUrl.value = getXMLText(data, 'Location');
  }

  get fileName() {
    // prettier-ignore
    return this.fileInput.value.split('/').pop().split('\\').pop();
  }

  get fileSize() {
    return this.fileInput.files[0].size;
  }

  disableFileInput() {
    this.fileInput.setAttribute('disabled', 'disabled');
  }

  updatePreview(data) {
    const imageUrl = getXMLText(data, 'Location');

    const previewHtml = `
      <figure class="figure mr-3">
        <p class="text-muted">Newly uploaded ${this.name}</p>
        <a href="${imageUrl}" target="_blank">
          <img src="${imageUrl}" class="figure-img img-fluid rounded">
        </a>
        <figcaption class="figure-caption">
          Name: ${this.fileName}
          <br/>
          Size: ${this.fileSize} bytes
        </figcaption>
      </figure>
    `;

    this.previewContainer.append(previewHtml);
  }

  get formData() {
    const formdata = new FormData();
    this.presignFields.forEach(field => formdata.append(field.name, field.value));
    formdata.append(this.fileInput.name, this.fileInput.files[0], this.fileName);
    return formdata;
  }

  set showProgressBar(showOrHide) {
    this.progress.toggleClass('invisible', !showOrHide);
  }

  sendForm() {
    return $.ajax({
      type: 'post',
      url: this.action,
      contentType: false,
      processData: false,
      beforeSend: () => (this.showProgressBar = true),
      data: this.formData
    });
  }
}

new FileUpload({ name: 'avatar' });
new FileUpload({ name: 'banner' });
