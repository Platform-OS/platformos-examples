ConsoleLogHTML.connect(document.getElementById("logger"));

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const request = ({ url, method = "POST", form }) => {
  console.info(`Starting request:
      URL: ${url}
      method: ${method}`);

  return fetch(url, {
    credentials: "same-origin",
    method: method,
    body: new FormData(form)
  }).then(handleErrors);
};

// --------

const Create = event => {
  event.preventDefault();

  request({
    url: event.target.getAttribute("action"),
    form: event.target
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    }).then(response => {
      console.info(`Customization successfully created. Customization id: ${response.id}`);
    })
    .catch(error => console.log(error));
};

const createForm = document.querySelector('[data-form="create"]');
createForm.addEventListener("submit", Create);

// --------

const updateReadTable = data => {
  const readBody = document.querySelector('[data-body="readTable"]');
  console.info(`Raw data fetched from the server (JSON): `, JSON.stringify(data));
  const html = data.map(
    feedback => `
    <tr>
      <td>${feedback.id}</td>
      <td>${feedback.created_at}</td>
      <td>${feedback.updated_at}</td>
      <td>${feedback.rate}</td>
      <td>${feedback.message}</td>
    </tr>
  `
  ).join('');

  console.info('Updating table with data fetched from the server.')
  readBody.innerHTML = html;
};

const Read = () => {
  console.info('Fetching data from /feedback_list.json')
  fetch("/feedback_list.json")
    .then(response => response.json())
    .then(updateReadTable)
    .then(() => {
      const refreshTimestamp = document.querySelector('[data-body="refreshTimestampRead"]');
      refreshTimestamp.innerHTML = new Date();
    })
    .catch(error => console.log(error));
};

const refreshReadButton = document.querySelector('[data-button="refreshRead"]');

refreshReadButton.addEventListener("click", Read);
window.addEventListener("load", Read);

// --------

const Update = event => {
  event.preventDefault();
  const id = event.target.querySelector('[name="customization_id"]').value;

  request({
    url: `${event.target.getAttribute("action")}/${id}`,
    form: event.target
  })
    .then(response => {
      if (response.ok) {
        console.info(`Customization successfully updated.`);
      }
    })
    .catch(error => console.log(error));
};

const updateForm = document.querySelector('[data-form="update"]');
updateForm.addEventListener("submit", Update);

// --------

const Delete = event => {
  event.preventDefault();
  const id = event.target.querySelector('[name="customization_id"]').value;

  request({
    url: `${event.target.getAttribute("action")}/${id}`,
    form: event.target
  })
    .then(response => {
      if (response.ok) {
        console.info(`Customization ${id} successfully deleted.`);
      }
    })
    .catch(error => console.log(error));
};

const deleteForm = document.querySelector('[data-form="delete"]');
deleteForm.addEventListener("submit", Delete);