import axios from 'axios';
const BASE_URL = 'https://open-rest.herokuapp.com';

export default class RunCode {

  //  http://localhost:5000/api/runcodev2/python3/print(5)
  static async run (lang, code) {
    const result = await axios.post(BASE_URL + '/api/runcode', { 'lang': lang, 'code': code });
    const resp = await result.data;
    return resp;
  }
}