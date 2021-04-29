import axios from 'axios';

export const deleteDocument = async () => {
  /*
  const eventTrigger = event.target.classList[1];
  let selector = document.getElementsByClassName(`document ${eventTrigger}`)[0];
  let deleteFlagHtml = '<tr class="delete-container delete-flag"><td class="delete-toolbox" colspan="2"><button class="delete-cancel"><h2>Cancel</h2></button><button class="delete-confirm"><h2>Delete</h2></button></td></tr>'
  let deleteDocumentHtml = `<img class="delete-document ${eventTrigger}" src="/images/delete.svg">`

  selector.classList.add('delete-container');
  selector.insertAdjacentHTML('afterend', deleteFlagHtml);
  document.getElementsByClassName(`delete-document ${event.target.classList[1]}`)[0].remove();

  function cancelDeletion() {
    document.getElementsByClassName('delete-flag')[0].remove();
    selector.classList.remove('delete-container');
    document.getElementsByClassName(`document-value ${eventTrigger}`)[0].insertAdjacentHTML('beforeend', deleteDocumentHtml);
    document.getElementsByClassName(`delete-document ${eventTrigger}`)[0].addEventListener('click', deleteDocument);
  } 

  function confirmDeletion() {
    console.log('Document deletion confirmed');
  }

  const deleteCancelBtn = document.getElementsByClassName('delete-cancel')[0];
  const deleteConfirmBtn = document.getElementsByClassName('delete-confirm')[0];

  deleteCancelBtn.addEventListener('click', cancelDeletion);
  deleteConfirmBtn.addEventListener('click', confirmDeletion);
  */
  console.log(event.target.classList);
  let eventTrigger = event.target.classList[1];
  console.log(eventTrigger);
  let selector = document.getElementsByClassName(`document ${eventTrigger}`)[0];
  selector.classList.add('delete-container');
  document.getElementsByClassName(`delete-document ${eventTrigger}`)[0].style.display = 'none';
  document.getElementsByClassName(`delete-flag ${eventTrigger}`)[0].style.display = 'table-row';
}

export const deleteCancel = async () => {
  let eventTrigger = event.target.classList[1];
  document.getElementsByClassName(`document ${eventTrigger}`)[0].classList.remove('delete-container');
  document.getElementsByClassName(`delete-flag ${eventTrigger}`)[0].style.display = 'none';
  document.getElementsByClassName(`delete-document ${eventTrigger}`)[0].style.display = 'inline-block';
}

export const deleteConfirm = async () => {
  try {
    const res = await axios({
      method: 'POST',
      url: './?_method=DELETE',
      data: {
        key: event.target.classList[1]
      }
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    console.log(err.response);
  }
}