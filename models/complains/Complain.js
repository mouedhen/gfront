import {AbstractModel} from "../core/AbstractModel";
import {apiDomain} from "../config";
import axios from "axios";

export class Complain extends AbstractModel {
  constructor(attributes = {
    id: -1,
    claimer_name: null,
    claimer_phone_number: null,
    municipality_id: null,
    subject: null,
    description: null,
    latitude: null,
    longitude: null,
    acceptCondition: false,
  }, config = {
    apiUrl: apiDomain + '/public/claims',
  }) {
    super();
    this.serialize(attributes);
    this.config = config;
  }

  serialize(attributes = {
    id: -1,
    claimer_name: null,
    claimer_phone_number: null,
    municipality_id: null,
    subject: null,
    description: null,
    latitude: null,
    longitude: null,
    acceptCondition: false,
  }) {
    this.id = attributes.id;
    this.claimer_name = attributes.claimer_name;
    this.claimer_phone_number = attributes.claimer_phone_number;
    this.municipality_id = attributes.municipality_id;
    this.subject = attributes.subject;
    this.description = attributes.description;
    this.latitude = attributes.latitude;
    this.longitude = attributes.longitude;
    this.acceptCondition = attributes.acceptCondition;
  }

  async create() {
    return axios(
      {
        method: 'POST',
        url: apiDomain + '/public/claims/create',
        data: this
      })
      .then(response => {
        this.serialize({
          id: response.data.id,
          claimer_name: response.data.claimer.name,
          claimer_phone_number: response.data.claimer.phone_number,
          municipality_id: response.data.municipality.id,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        });
        return this
      })
      .catch(error => {
        throw error
      })
  }

}
