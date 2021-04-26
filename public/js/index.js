import '@babel/polyfill';
import { logout } from './logout';
import {  } from './collections';
import { accountDropdown, popup, closePopup } from './ui';

// DOM ELEMENTS
const logOutBtn = document.getElementById('logout');
const accountDropdownBtn = document.querySelector('.dropBtn');
const insertDataBtn = document.getElementById('insert-data');
const deleteDocumentBtn = document.querySelector('.delete-document');
const popupCancelBtn = document.getElementById('popup-cancel');

// DELEGATION
if (logOutBtn) logOutBtn.addEventListener('click', logout);
if (accountDropdownBtn) accountDropdownBtn.addEventListener('click', accountDropdown);
if (insertDataBtn) insertDataBtn.addEventListener('click', popup);
if (deleteDocumentBtn) deleteDocumentBtn.addEventListener('click', deleteDocument);
if (popupCancelBtn) popupCancelBtn.addEventListener('click', closePopup);
