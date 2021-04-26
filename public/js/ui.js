export const accountDropdown = async () => {
  /* When the user clicks on the button, 
  toggle between hiding and showing the dropdown content */
  console.log('accountDropdown clicked');
  document.getElementById('myDropdown').classList.toggle('show');

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropBtn')) {
      var dropdowns = document.getElementsByClassName('dropdown-content');
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
}

export const popup = () => {
  document.getElementById('popup').style.display = 'block';
}

export const closePopup = () => {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('popup-form').reset();
}

