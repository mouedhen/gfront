import {apiDomain} from "../config";
import axios from "axios";

export class AbstractModel {

  constructor(attributes = {}, config = {apiUrl: apiDomain}) {
    this.config = config;

    if (new.target === AbstractModel) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }

    if (this.serialize === undefined) {
      throw new TypeError("Must override serialize method");
    }
  }

  async fetchAll(params) {
    return axios(
      {
        method: 'GET',
        url: this.config.apiUrl,
        params
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error
      })
  }

  async fetch(id) {
    return axios(
      {
        method: 'GET',
        url: this.config.apiUrl + '/' + id,
      })
      .then(response => {
        this.serialize(response.data);
        return this;
      })
      .catch(error => {
        throw error
      })
  }

  async save() {
    return this.create()
  }

  async create() {
    return axios(
      {
        method: 'POST',
        url: this.config.apiUrl,
        data: this
      })
      .then(response => {
        this.serialize(response.data);
        return this
      })
      .catch(error => {
        throw error
      })
  }
}
