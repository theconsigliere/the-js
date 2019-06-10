//------------------------------------------------------
// gets result of searchView  'query' then does an api call to find results,

//import npm package from node modules
import axios from "axios";

//exports to 'controller 'index.js'
export default class Search {
  constructor(query) {
    this.query = query;
  }

  // Use async as a method of construtor
  async getResults() {
    const key = "30f641ec643488f12ec63459ad7ee18c";

    try {
      //axios is like 'fetch' for all browsers but automatic returns json
      const res = await axios(
        `https://www.food2fork.com/api/search?key=${key}&q=${this.query}`
      );
      this.result = res.data.recipes;
      //   console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}
