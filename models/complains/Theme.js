import {AbstractModel} from "../core/AbstractModel";
import {apiUrl} from "../config";

export class Theme extends AbstractModel {
  constructor(attributes = {
    id: -1,
    name: '',
    description: '',
    color: null,
    claims_count: 0,

  }, config = {
    apiUrl: apiUrl + 'themes',
  }) {
    super();
    this.serialize(attributes);
    this.config = config;
  }

  serialize(attributes = {
    id: -1,
    name: '',
    description: '',
    color: null,
    claims_count: 0,
  }) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.color = attributes.color;
    this.claims_count = attributes.claims_count;
  }
}
