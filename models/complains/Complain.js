import {AbstractModel} from "../core/AbstractModel";
import {apiUrl} from "../config";

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
    apiUrl: apiUrl + 'complains',
  }) {
    super();
    this.serialize(attributes);
    this.config = config;
  }

  serialize(attributes = {
    id: -1,
    subject: null,
    description: null,
    latitude: null,
    longitude: null,
    attachments: null,
    municipality: null,
    theme: null,
  }) {
    this.id = attributes.id;
    this.subject = attributes.subject;
    this.description = attributes.description;
    this.latitude = attributes.latitude;
    this.longitude = attributes.longitude;
    this.attachments = attributes.attachments;
    this.municipality = attributes.municipality;
    this.theme = attributes.theme;
  }
}
