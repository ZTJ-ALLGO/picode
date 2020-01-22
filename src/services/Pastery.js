import axios from 'axios';

export default class Pastery {

  static async CreatePaste () {
    const data = { body: "hello world" };

    const response = await axios({
      method: 'POST', url: 'http://hastebin.com/documents/', data
    });
    const binId = await response.data;
    this.saveLocalSorage(binId);
    return binId;
  }

  static async getBin (binId) {
    const response = await axios.get('http://hastebin.com/documents/' + binId);
    const binContent = await response.data;
    return binContent;
  }

  static saveLocalSorage (binToBedSaved) {
    let bins = localStorage.getItem('hastebin'), localBins = [];
    if (bins) {
      localBins = JSON.parse(bins);
    }
    localBins.push(binToBedSaved);
    localStorage.setItem('hastebin', JSON.stringify(localBins));
    return true;
  }

  static getLocalBins () {
    let bins = localStorage.getItem('hastebin'), localBins = [];
    if (bins) {
      localBins = JSON.parse(bins);
    }
    return localBins;
  }


}