
/* Data struct used to pass interpreter return values around. */
export default class CodeRetVal {

  constructor(obj) {
    this.error = null;

    if (typeof obj !== 'undefined') {
      this.type = obj.type;
      this.data = obj.data;
      if (obj.error) {
        this.error = obj.error;
      }
    }
  }

  /* Converts the object into a string.*/
  toString() {
    return `
        Type: ${this.type}
        Data: ${this.data}
        Error: ${this.error}
    `;
  }

}
