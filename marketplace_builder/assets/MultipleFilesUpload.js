(() => {
  const SELECTOR = '[data-multiple-files]';
  const SELECTOR_FILE_CONTAINER = '[data-multiple-files-item]';
  const SELECTOR_INPUT_ID = '[data-multiple-files-input="id"]';
  const SELECTOR_INPUT_DESTROY = '[data-multiple-files-input="destroy"]';
  const SELECTOR_ADD_BUTTON = '[data-multiple-files-button="add"]';
  const SELECTOR_REMOVE_BUTTON = '[data-multiple-files-button="remove"]';
  const SELECTOR_CUSTOM_FILE_INPUT = '.custom-file-input';
  const CONTAINER = document.querySelector(SELECTOR);

  const DEFAULT_LABEL = 'Choose file';

  const qa = s => [...document.querySelectorAll(s)];
  const q = s => document.querySelector(s);
  const getNextIndex = () => qa(SELECTOR_FILE_CONTAINER).length;

  const updateClone = element => {
    const elements = element.querySelectorAll('[name]');
    const attachmentId = element.querySelector(SELECTOR_INPUT_ID);
    elements.forEach(el => (el.name = el.name.replace('[0]', `[${getNextIndex()}]`))); // increment id
    element.querySelector('label').innerText = DEFAULT_LABEL; // reset label
    attachmentId.value = attachmentId.value + 1; // increment attachment id
    return element;
  };

  const addNewFile = event => {
    const original = q(SELECTOR_FILE_CONTAINER);
    const clone = original.cloneNode(true);
    const updated = updateClone(clone);

    CONTAINER.insertBefore(updated, event.target);
  };

  const removeFile = event => {
    const currentFileContainer = event.target.closest(SELECTOR_FILE_CONTAINER);
    const destroyInput = currentFileContainer.querySelector(SELECTOR_INPUT_DESTROY);
    currentFileContainer.classList.add('hidden'); // hide row in the UI
    destroyInput.value = 1; // make sure this file will be deleted
  };

  // prettier-ignore
  const updateFileName = event => {
    const label = $(event.target).val().replace(/^.*[\\\/]/, '') || DEFAULT_LABEL;
    $(event.target).next('label').addClass('selected').html(label);
  };

  const initialize = () => {
    $(SELECTOR_ADD_BUTTON).on('click', addNewFile);
    $(SELECTOR).on('click', SELECTOR_REMOVE_BUTTON, removeFile);
    $(SELECTOR).on('change', SELECTOR_CUSTOM_FILE_INPUT, updateFileName);
  };

  initialize();
})();
