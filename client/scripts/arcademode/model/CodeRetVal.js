
/* Data struct used to pass interpreter return values around. */
export default class CodeRetVal {

  constructor(obj) {
    this.error = null;

    if (typeof obj !== 'undefined') {
      this.type = obj.type;
      this.data = obj.value;
      if (obj.error) {
        this.error = obj.error;
      }
    }

    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        console.log(p + ' => ' + obj.p);
      }
    }
  }

  /* Converts the object into a string.*/
  toString() {
    return `
        Type: ${this.type}
        Value: ${this.data}
        Error: ${this.error}
    `;
  }

}
