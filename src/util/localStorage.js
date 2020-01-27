// save as array
export default class LocalSaver {

  /**
   * @param {string} key 
   * @param {Array} value 
   * @returns {Array}
   */
  static save (key, value) {
    let local = localStorage.getItem(key);
    let localData = [];
    if (local) {
      localData = this.get(key);
    }

    if (!this.checkValueExist(localData, value)) {
      localData.push(value);
      localStorage.setItem(key, JSON.stringify(localData));
    }
    return localData;
  }

  /**
   * @param {string} key 
   * @returns {Array}
   */
  static get (key) {
    let local = localStorage.getItem(key);
    return local ? JSON.parse(local) : [];
  }

  /**
   * remove item from the array
   * @param {string} key 
   * @param {string|number} valueToRemove 
   */
  static removeOne (key, valueToRemove) {
    // for files, not standard method
    let newValues = this.get(key).filter(v => v.filename !== valueToRemove);
    return this.replace(key, newValues)
  }

  // clear current localStrage object
  static clear (key) { localStorage.removeItem(key); }

  /**
   * replace the current array in localStorage
   * @param {string} key
   * @param {Array} newValues
   */
  static replace (key, newValues) {
    localStorage.setItem(key, JSON.stringify(newValues));
    return this.get(key);
  }

  static checkValueExist (data, newValue) {
    return data.some(d => d === newValue);
  }  
}