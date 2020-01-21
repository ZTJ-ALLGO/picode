import axios from 'axios';

const langs = [
  { id: 46, name: "Bash (5.0.0)", mode_colors: "sh" },
  { id: 49, name: "C (GCC 8.3.0)", mode_colors: "c_cpp" },
  { id: 53, name: "C++ (GCC 8.3.0)", mode_colors: "c_cpp" },
  { id: 50, name: "C (GCC 9.2.0)", mode_colors: "c_cpp" },
  { id: 54, name: "C++ (GCC 9.2.0)", mode_colors: "c_cpp" },
  { id: 51, name: "C# (Mono 6.6.0.161)", mode_colors: "csharp" },
  { id: 56, name: "D (DMD 2.089.1)", mode_colors: "d" },
  { id: 57, name: "Elixir (1.9.4)", mode_colors: "elixir" },
  { id: 60, name: "Go (1.13.5)", mode_colors: "golang" },
  { id: 61, name: "Haskell (GHC 8.8.1)", mode_colors: "haskell" },
  { id: 62, name: "Java (OpenJDK 13.0.1)", mode_colors: "java" },
  { id: 63, name: "Node.js 12.14.0", mode_colors: "typescript" },
  { id: 64, name: "Lua (5.3.5)", mode_colors: "lua" },
  { id: 65, name: "OCaml (4.09.0)", mode_colors: "ocaml" },
  { id: 67, name: "Pascal (FPC 3.0.4)", mode_colors: "pascal" },
  { id: 68, name: "PHP (7.4.1)", mode_colors: "php" },
  { id: 71, name: "Python (3.8.1)", mode_colors: "python" },
  { id: 72, name: "Ruby (2.7.0)", mode_colors: "ruby" },
  { id: 73, name: "Rust (1.40.0)", mode_colors: "rust" }
];

const BASE = 'https://api.judge0.com';

export default class JudgeApi {

  static async createSubmission ({ source_code, language_id, stdin = "" }) {    
    const url = BASE + '/submissions';
    const data = {
      "source_code": source_code,
      "language_id": language_id,
      "stdin": stdin
    }
    const response = await axios.post(url, data);
    const result = await response.data;
    localStorage.setItem('code-token', result.token);
    return localStorage.getItem('code-token') || result.token;
  }

  static async sendReq (token) {
    const url = BASE + '/submissions/';
    let urlParams = '?base64_encoded=false&fields=stdout,stderr,status_id,language_id,time,status';
    let response = await axios.get(url + token + urlParams);
    let result = await response.data;
    return result;
  }

  static async getResult (reqData) {
    let token = '', firstResult = {}, statusId = 5

    token = token
      ? localStorage.getItem('code-token')
      : await this.createSubmission(reqData);

    return new Promise(async (resolve, reject) => {
      firstResult = await this.sendReq(token);
      statusId = firstResult.status.id;
      if (statusId > 2) { resolve(firstResult); }
      setTimeout(async () => {
        try {
          firstResult = await this.sendReq(token);
          resolve(firstResult);
        } catch (error) {
          reject(error);
        }
      }, 2000);
    });
  }

  static async getSubmissionResult (reqData) {
    let result = await this.getResult(reqData);
    if ((result && result.status.id === 3) || !result) {
      localStorage.removeItem('code-token');
    }

    else {
      result = {
        stdout: result.status.description,
        time: result.time,
        stderr: result.stderr
      }
    }

    return result;
  }

  static getLangs () {
    // const response = await axios.get('https://api.judge0.com/languages/all');
    // const languages = await response.data;
    return langs;
  }

  static getLangId (mode_colors) {
    return JudgeApi.getLangs().find(l => l.mode_colors === mode_colors).id;
  }

  static getModeColor (langId) {
    return JudgeApi.getLangs().find(l => l.id === +(langId)).mode_colors;
  }

  static getLangName (name) {    
    return (JudgeApi.getLangs().find(l => l.mode_colors === name).name)
      .split('(')[0];
  }

  static async getStatues () {
    const response = await axios.get('https://api.judge0.com/statuses');
    const statues = await response.data;
    return statues;
  }
}