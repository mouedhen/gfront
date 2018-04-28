import {apiDomain} from "../config";
import {OldAbstractModel} from "../core/OldAbstractModel";

export class Event extends OldAbstractModel {

  constructor(attributes = {
    id: -1,
    start_date: null,
    end_date: null,
    name_en: null,
    name_fr: null,
    name_ar: null,
    longitude: null,
    latitude: null,
    description_en: null,
    description_fr: null,
    description_ar: null,
  }, config = {
    apiUrl: apiDomain + '/public/events',
  }) {
    super();
    this.serialize(attributes);
    this.config = config;
  }

  serialize(attributes = {
    id: -1,
    start_date: null,
    end_date: null,
    name_en: null,
    name_fr: null,
    name_ar: null,
    longitude: null,
    latitude: null,
    description_en: null,
    description_fr: null,
    description_ar: null,
  }) {
    this.id = attributes.id;
    this.start_date = attributes.start_date;
    this.end_date = attributes.end_date;
    this.name_en = attributes.name_en;
    this.name_fr = attributes.name_fr;
    this.name_ar = attributes.name_ar;
    this.longitude = attributes.longitude;
    this.latitude = attributes.latitude;
    this.description_en = attributes.description_en;
    this.description_fr = attributes.description_fr;
    this.description_ar = attributes.description_ar;
  }
}
