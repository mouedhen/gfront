import {AbstractModel} from "../core/AbstractModel";
import {apiDomain} from "../config";

export class Municipality extends AbstractModel {
  constructor(attributes = {
    id: -1,
    name_en: '',
    name_fr: '',
    name_ar: '',

    population: null,
    houses: null,
    regional_council_number: null,
    municipal_council_number: null,

    website: '',
    phone: '',
    email: '',
    fax: '',

    description_en: '',
    description_fr: '',
    description_ar: '',

    is_active: false,
    city_id: null,

    city: {},
    claims: [],
    attachments: [],
  }, config = {
    apiUrl: apiDomain + '/public/municipalities',
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

    population: null,
    houses: null,
    regional_council_number: null,
    municipal_council_number: null,

    website: '',
    phone: '',
    email: '',
    fax: '',

    description_en: '',
    description_fr: '',
    description_ar: '',

    is_active: false,
    city_id: null,

    city: {},
    claims: [],
    attachments: [],
  }) {
    this.id = attributes.id;
    this.name_en = attributes.name_en;
    this.name_fr = attributes.name_fr;
    this.name_ar = attributes.name_ar;
    this.population = attributes.population;
    this.houses = attributes.houses;
    this.regional_council_number = attributes.regional_council_number;
    this.municipal_council_number = attributes.municipal_council_number;
    this.website = attributes.website;
    this.phone = attributes.phone;
    this.email = attributes.email;
    this.fax = attributes.fax;
    this.description_en = attributes.description_en;
    this.description_fr = attributes.description_fr;
    this.description_ar = attributes.description_ar;
    this.is_active = attributes.is_active;
    this.city_id = attributes.city_id;
    this.city = attributes.city;
    this.claims = attributes.claims;
    this.attachments = attributes.attachments;
  }

}
