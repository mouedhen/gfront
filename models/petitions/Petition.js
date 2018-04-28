import {apiDomain} from "../config";
import {Target} from "./Target";
import {Petitioner} from "./Petitioner";
import {Theme} from "./Theme";
import {OldAbstractModel} from "../core/OldAbstractModel";

export class Petition extends OldAbstractModel {

  constructor(attributes = {
    id: -1,
    start_date: null,
    end_date: null,

    target_id: null,
    target: new Target(),

    petitioner_id: null,
    petitioner: new Petitioner(),

    theme_id: null,
    theme: new Theme(),

    cover: null,

    signatures: 0,
    attachments: [],

    name: null,
    description: null,
    requested_signatures_number: null,
    status: null,
    is_boosted: false,
    uuid: null
  }, config = {
    apiUrl: apiDomain + '/public/petitions',
  }) {
    super();

    this.id = attributes.id;
    this.start_date = attributes.start_date;
    this.end_date = attributes.end_date;

    this.target_id = attributes.target_id;
    this.target = attributes.target;
    this.petitioner_id = attributes.petitioner_id;
    this.petitioner = attributes.petitioner;
    this.theme_id = attributes.theme_id;
    this.theme = attributes.theme;

    this.signatures = attributes.signatures;

    this.cover = attributes.cover;
    this.attachments = attributes.attachments;

    this.name = attributes.name;
    this.description = attributes.description;
    this.requested_signatures_number = attributes.requested_signatures_number;
    this.status = attributes.status;
    this.is_boosted = attributes.is_boosted;
    this.uuid = attributes.uuid;

    this.config = config;
  }

  setDateRange(startDate, endDate) {
    this.start_date = startDate;
    this.end_date = endDate;
    return this;
  }

  serialize(attributes = {
    id: -1,
    start_date: null,
    end_date: null,

    target_id: null,
    target: new Target(),

    petitioner_id: null,
    petitioner: new Petitioner(),

    theme_id: null,
    theme: new Theme(),

    cover: null,

    signatures: 0,
    attachments: [],

    name: null,
    description: null,
    requested_signatures_number: null,
    status: null,
    is_boosted: false,
    uuid: null
  }) {
    this.id = attributes.id;
    this.start_date = attributes.start_date;
    this.end_date = attributes.end_date;

    this.signatures = attributes.signatures;

    this.target_id = attributes.target_id;
    this.target = attributes.target;
    this.petitioner_id = attributes.petitioner_id;
    this.petitioner = attributes.petitioner;
    this.theme_id = attributes.theme_id;
    this.theme = attributes.theme;

    this.cover = attributes.cover;
    this.attachments = attributes.attachments;

    this.name = attributes.name;
    this.description = attributes.description;
    this.requested_signatures_number = attributes.requested_signatures_number;
    this.status = attributes.status;
    this.is_boosted = attributes.is_boosted;
    this.uuid = attributes.uuid;
  }
}
