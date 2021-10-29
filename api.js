import axios from "axios"

export default {
  URL: '/api/',

  getElements(balconyID, windowID) {
    return axios.get(this.URL + `configurator_elements?balcony_id=${balconyID}&type_window_id=${windowID}`)
  },
  getWindowTypes(balconyID) {
    return axios.get(this.URL + `window_types?balcony_id=${balconyID}`)
  }
}