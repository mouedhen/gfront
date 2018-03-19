import {AbstractModel} from "../core/AbstractModel";
import {apiDomain} from "../config";

export class Theme extends AbstractModel {
  constructor(attributes = {
    id: -1,
    name_en: '',
    name_fr: '',
    name_ar: '',

    claims_count: null,
    color: null,
    is_active: false,
  }, config = {
    apiUrl: apiDomain + '/public/themes',
  }) {
    super();
    this.serialize(attributes);
    this.config = config;
  }

  serialize(attributes = {
    id: -1,
    name_en: '',
    name_fr: '',
    name_ar: '',

    claims_count: null,
    color: null,
    is_active: false,
  }) {
    this.id = attributes.id;
    this.name_en = attributes.name_en;
    this.name_fr = attributes.name_fr;
    this.name_ar = attributes.name_ar;
    this.claims_count = attributes.claims_count;
    this.color = attributes.color;
    this.is_active = attributes.is_active;
  }

}
