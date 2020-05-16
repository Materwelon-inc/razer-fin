import axios from 'axios';

export default {
  loadData(base64: string) {
    const payload = {
      base64image: base64,
    };
    return new Promise((resolve, reject) => {
      axios.post('https://niw1itg937.execute-api.ap-southeast-1.amazonaws.com/Prod/verify', payload, {
        auth: {
          username: 'razer-group-055',
          password: 'PmxGrZjao9FvcmGkcATs',
        },
        headers: {
          'x-api-key': 'PmxGrZjao9FvcmGkcATs',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
