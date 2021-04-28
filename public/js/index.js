import '@babel/polyfill';
import { logout } from './logout';
import { deleteDocument, deleteCancel, deleteConfirm } from './collections';
import { accountDropdown, popup, closePopup } from './ui';

// DOM ELEMENTS
const logOutBtn = document.getElementById('logout');
const accountDropdownBtn = document.querySelector('.dropBtn');
const insertDataBtn = document.getElementById('insert-data');
const deleteDocumentBtns = document.getElementsByClassName('delete-document');
const deleteCancelBtns = document.getElementsByClassName('delete-cancel');
console.log(deleteCancelBtns);
const deleteConfirmBtns = document.getElementsByClassName('delete-confirm');
const popupCancelBtn = document.getElementById('popup-cancel');

// DELEGATION
if (logOutBtn) logOutBtn.addEventListener('click', logout);
if (accountDropdownBtn) accountDropdownBtn.addEventListener('click', accountDropdown);
if (insertDataBtn) insertDataBtn.addEventListener('click', popup);

Array.from(deleteDocumentBtns).forEach((deleteDocumentBtn) => {
  deleteDocumentBtn.addEventListener('click', deleteDocument);
});
Array.from(deleteCancelBtns).forEach((deleteCancelBtn) => {
  deleteCancelBtn.addEventListener('click', deleteCancel);
});
Array.from(deleteConfirmBtns).forEach((deleteConfirmBtn) => {
  deleteConfirmBtn.addEventListener('click', deleteConfirm);
});

if (popupCancelBtn) popupCancelBtn.addEventListener('click', closePopup);
