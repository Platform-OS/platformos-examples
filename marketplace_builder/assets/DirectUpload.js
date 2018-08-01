const PREVIEW_SELECTOR = '[data-direct-upload-ajax="preview"]';
const $form = $('[data-direct-upload-ajax="form"]');
const $progress = $('[data-direct-upload-ajax="progress"]');

const getXMLText = (data, key) => $(data).find(key).text() || '';
const getFileName = () => $form.find('[name="file"]').val().split("/").pop().split("\\").pop();

const progressBar = {
  show: () => $progress.removeClass('invisible'),
  hide: () => $progress.addClass('invisible')
}

const logError = data => {
  const code = getXMLText(data, "Code");
  const message = getXMLText(data, "Message");

  console.error(`[${code}] ${message}`);
};

const updatePreview = data => {
  const imageUrl = getXMLText(data, "Location");

  const previewHtml = `
    <figure class="figure mr-3 w-25 mw-25">
      <a href="${imageUrl}" target="_blank">
        <img src="${imageUrl}" width="200" class="figure-img img-fluid rounded">
      </a>
      <figcaption class="figure-caption">${getFileName()}</figcaption>
    </figure>
  `;

  $(PREVIEW_SELECTOR).append(previewHtml);
};

const sendForm = data => {
  return $.ajax({
    type: "post",
    url: $form.attr("action"),
    contentType: false,
    processData: false,
    beforeSend: progressBar.show,
    data: data
  });
};

const onFileChange = () => {
  const formData = new FormData($form[0]); // create FormData object and populate it with form element passed into constructor

   // Do not try to upload file if no file was selected (prevents broken preview and unnecessary http requests)
  if (getFileName().length === 0) {
    return console.log('File not selected.');
  }

  sendForm(formData)
    .done(updatePreview)
    .fail(logError)
    .always(progressBar.hide);
};

const initialize = () => {
  $('[data-direct-upload-ajax="file"]').on("change", onFileChange);
};

initialize();
