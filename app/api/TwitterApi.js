import axios from 'axios';

export const fetch_request_token = (callback_url) => {
  return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'https://api.twitter.com/oauth/request_token',
        contentType: 'text/plain',
        data: {
          oauth_callback: callback_url
        }
      }).then((response) => {
        console.log('Fått tillbaka respons på steg 1');
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
    });
}