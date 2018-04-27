import {apiUrl} from "../config";
import {AbstractModel} from "../core/AbstractModel";

export class Contact extends AbstractModel {

  constructor(attributes = {
    id: -1,
    name: null,
    phone_number: null,
    email: null,
    address: null
  }, config = {
    apiUrl: apiUrl + 'contacts',
  }) {
    super();
    this.id = attributes.id;
    this.name = attributes.name;
    this.phone_number = attributes.phone_number;
    this.email = attributes.email;
    this.address = attributes.address;

    this.config = config;
  }

  serialize(attributes = {
    id: -1,
    name: null,
    phone_number: null,
    email: null,
    address: null
  }) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.phone_number = attributes.phone_number;
    this.email = attributes.email;
    this.address = attributes.address;
  }
}
