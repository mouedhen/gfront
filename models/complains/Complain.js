import {AbstractModel} from "../core/AbstractModel";
import {apiUrl} from "../config";

export class Complain extends AbstractModel {
  constructor(attributes = {
    id: -1,
    contact: null,
    contact_id: null,
    theme: null,
    theme_id: null,
    municipality: null,
    municipality_id: null,
    subject: null,
    description: null,
    latitude: null,
    longitude: null,
    has_approved_sworn_statement: false,
    has_approved_term_of_use: false,
    acceptConditions: false,
    lang: 'en',
  }, config = {
    apiUrl: apiUrl + 'complains',
  }) {
    super();
    this.serialize(attributes);
    this.config = config;
  }

  serialize(attributes = {
    id: -1,
    contact: null,
    contact_id: null,
    theme: null,
    theme_id: null,
    municipality: null,
    municipality_id: null,
    subject: null,
    description: null,
    latitude: null,
    longitude: null,
    has_approved_sworn_statement: false,
    has_approved_term_of_use: false,
    acceptConditions: false,
    lang: 'en',
  }) {
    this.id = attributes.id;
    this.contact = attributes.contact;
    this.contact_id = attributes.contact_id;
    this.theme = attributes.theme;
    this.theme_id = attributes.theme_id;
    this.municipality = attributes.municipality;
    this.municipality_id = attributes.municipality_id;
    this.subject = attributes.subject;
    this.description = attributes.description;
    this.latitude = attributes.latitude;
    this.longitude = attributes.longitude;
    this.has_approved_sworn_statement = attributes.has_approved_sworn_statement;
    this.has_approved_term_of_use = attributes.has_approved_term_of_use;
    this.acceptConditions = attributes.acceptConditions;
    this.lang = attributes.lang;
  }
}
