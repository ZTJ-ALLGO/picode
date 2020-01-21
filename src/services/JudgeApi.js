import axios from 'axios';

const langs = [
  { id: 46, name: "Bash (5.0.0)", lang: "sh" },
  { id: 49, name: "C (GCC 8.3.0)", lang: "c_cp" },
  { id: 53, name: "C++ (GCC 8.3.0)", lang: "c_pp" },
  { id: 50, name: "C (GCC 9.2.0)", lang: "c_cp" },
  { id: 54, name: "C++ (GCC 9.2.0)", lang: "c_pp" },
  { id: 51, name: "C# (Mono 6.6.0.161)", lang: "csharp" },
  { id: 55, name: "Common Lisp (SBCL 2.0.0)", lang: "csp" },
  { id: 56, name: "D (DMD 2.089.1)", lang: "d" },
  { id: 57, name: "Elixir (1.9.4)", lang: "elixir" },
  { id: 60, name: "Go (1.13.5)", lang: "golang" },
  { id: 61, name: "Haskell (GHC 8.8.1)", lang: "haskell" },
  { id: 62, name: "Java (OpenJDK 13.0.1)", lang: "java" },
  { id: 63, name: "Node.js 12.14.0", lang: "javasript" },
  { id: 64, name: "Lua (5.3.5)", lang: "lua" },
  { id: 65, name: "OCaml (4.09.0)", lang: "ocaml" },
  { id: 66, name: "Octave (5.1.0)", lang: "octave" },
  { id: 67, name: "Pascal (FPC 3.0.4)", lang: "pascal" },
  { id: 68, name: "PHP (7.4.1)", lang: "php" },
  { id: 71, name: "Python (3.8.1)", lang: "python" },
  { id: 72, name: "Ruby (2.7.0)", lang: "ruby" },
  { id: 73, name: "Rust (1.40.0)", lang: "rust" },
  { id: 74, name: "TypeScript (3.7.4)", lang: "typescript" }
];

const base = 'https://api.judge0.com';

export default class JudgeApi {

  static async createSubmission ({ source_code, language_id, stdin = "" }) {
    const url = base + '/submissions';
    const data = {
      "source_code": source_code,
      "language_id": language_id,
      "stdin": stdin
    }
    const response = await axios.post(url, data);
    const result = await response.data;
    localStorage.setItem('code-token', result.token);
    return result.token;
  }

  static async getResult (reqData) {
    const url = base + '/submissions/';
    const urlParams = '?base64_encoded=false&fields=stdout,stderr,status_id,language_id,time,status';
    let token = '', firstResult = {}, statusId = 5

    token = token
      ? localStorage.getItem('code-token')
      : await this.createSubmission(reqData);

    return new Promise(async (resolve, reject) => {
      firstResult = await axios.get(url + token + urlParams);
      statusId = firstResult.status.id;
      if (statusId > 2) { resolve(firstResult); }

      setTimeout(async () => {
        try {
          let response = await axios.get(url + token + '?base64_encoded=false&fields=stdout,stderr,status_id,language_id,time,status');
          firstResult = response.data;
          resolve(firstResult);
        } catch (error) {
          reject(error);
        }
      }, 2000);
    });
  }

  static async getSubmissionResult (reqData) {
    let result = await this.getResult(reqData);
    if ((result && result.status.id > 2) || !result) {
      localStorage.removeItem('code-token')
    }

    if (result && result.status.id > 3) {
      return {
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

  static getLangId (langLang) {
    return JudgeApi.getLangs().find(l => l.lang === langLang).id;
  }

  static getLangLang (langId) {
    return JudgeApi.getLangs().find(l => l.id === +(langId)).lang;
  }

  static async getStatues () {
    const response = await axios.get('https://api.judge0.com/statuses');
    const statues = await response.data;
    return statues;
  }
}