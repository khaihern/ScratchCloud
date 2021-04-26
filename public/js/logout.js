import axios from 'axios';

export const logout = async () => {
  try {
    console.log('logout btn clicked');
    const res = await axios({
      method: 'POST',
      url: '/logout?_method=DELETE'
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    console.log(err.response);
  }
}