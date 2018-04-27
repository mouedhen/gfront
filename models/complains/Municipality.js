import {AbstractModel} from "../core/AbstractModel";
import {apiUrl} from "../config";

export class Municipality extends AbstractModel {
  constructor(attributes = {
    id: -1,
    name: '',
    description: '',

    population: null,
    houses: null,
    regional_council_number: null,
    municipal_council_number: null,

    website: '',
    phone: '',
    email: '',
    fax: '',

    city_id: null,

    city: {},
    complains: [],
    attachments: [],
  }, config = {
    apiUrl: apiUrl + 'municipalities',
  }) {
    super();
    this.serialize(attributes);
    this.config = config;
  }

  serialize(attributes = {
    id: -1,
    name: '',

    population: null,
    houses: null,
    regional_council_number: null,
    municipal_council_number: null,

    website: '',
    phone: '',
    email: '',
    fax: '',

    description: '',

    is_active: false,
    city_id: null,

    city: {},
    complains: [],
    attachments: [],
  }) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.population = attributes.population;
    this.houses = attributes.houses;
    this.regional_council_number = attributes.regional_council_number;
    this.municipal_council_number = attributes.municipal_council_number;
    this.website = attributes.website;
    this.phone = attributes.phone;
    this.email = attributes.email;
    this.fax = attributes.fax;
    this.description = attributes.description;
    this.is_active = attributes.is_active;
    this.city_id = attributes.city_id;
    this.city = attributes.city;
    this.complains = attributes.complains;
    this.attachments = attributes.attachments;
  }

}
