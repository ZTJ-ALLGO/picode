import axios from 'axios';

const BASE_URL = "https://api.paste.ee/v1";
const headers = {
  "Content-Type": "application/json",
  "X-Auth-Token": "aO39RBMQzln8oyptqOEnkpBeOL9pF7Z1jNjy2fC4J"
}

export default class PasteEE {

  static async createBin () {
    const data = {
      "description": "test",
      "sections": [
        {
          "name": "Section1",
          "syntax": "autodetect",
          "contents": "Testing!"
        }
      ]
    };

    const response = await axios({
      method: 'POST', url: 'https://api.paste.ee/v1/pastes', headers, data
    });
    const binInfo = await response.data;
    this.saveLocalSorage(binInfo);
    return binInfo;
  }

  static async getBin (binId) {
    const response = await axios.get(BASE_URL + '/pastes/' + binId, { headers });
    const binContent = await response.data;
    return binContent;
  }

  static async removeBin(binId) {
    const response = await axios({
      method: 'DELETE', url: 'https://api.paste.ee/v1/pastes/'+binId, headers
    });
    const removedBin = await response.data;
    return removedBin;
  }

  static async getServerBins () {
    const response = await axios.get(BASE_URL + '/pastes', { headers });
    const bins = await response.data;
    return bins;
  }

  static saveLocalSorage (binToBedSaved) {
    let bins = localStorage.getItem('bins'), localBins = [];
    if (bins) {
      localBins = JSON.parse(bins);
    }
    localBins.push(binToBedSaved);
    localStorage.setItem('bins', JSON.stringify(localBins));
    return true;
  }

  static getLocalBins () {
    let bins = localStorage.getItem('bins'), localBins = [];
    if (bins) {
      localBins = JSON.parse(bins);
    }
    return localBins;
  }
}