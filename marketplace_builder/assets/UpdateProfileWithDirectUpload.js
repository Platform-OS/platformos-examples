(function() {
  const qa = s => [...document.querySelectorAll(s)];
  const q = s => document.querySelector(s);

  const $form = $('[data-s3-direct-upload="form"]');
  const $previewContainer = $form.find('[data-s3-direct-upload-field="preview"]');
  const $fileField = q('[data-s3-direct-upload-field="file"]');
  const $presignFields = qa('[data-s3-direct-upload-field="presign"]');
  const $progress = $form.find('[data-direct-upload-ajax="progress"]');

  const getXMLText = (data, key) => $(data).find(key).text() || '';
  const getFileName = () => $form.find('[name="file"]').val().split("/").pop().split("\\").pop();

  const progressBar = {
    show: () => $progress.removeClass('invisible'),
    hide: () => $progress.addClass('invisible')
  }

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

    $previewContainer.append(previewHtml);
  };

  const updateFileUrl = data => {
    const fileUrl = getXMLText(data, "Location");
    q('[data-s3-direct-upload-field="file-url"]').value = fileUrl;
  }

  const getFormData = form => {
    const formdata = new FormData();

    $presignFields.forEach(field => {
      console.log('Adding to formdata: ', `${field.name} : ${field.value}`);
      formdata.append(field.name, field.value);
    });

    formdata.append($fileField.name, $fileField.files[0], getFileName($fileField.value));

    return formdata;
  }

  const sendForm = data => {
    return $.ajax({
      type: "post",
      url: $form.find('[name="action"]').val(),
      contentType: false,
      processData: false,
      beforeSend: progressBar.show,
      data: data
    });
  };

  const onFileChange = () => {
    const formData = getFormData($form[0]);

    sendForm(formData)
      .done(updateFileUrl)
      .done(updatePreview)
  };

  const initialize = () => {
    console.log('Update profile with direct upload initializing.');
    $form.find('[name="file"]').on("change", onFileChange);
  }

  initialize();
})();
