import {AbstractModel} from "../core/AbstractModel";
import {apiDomain} from "../config";

export class Theme extends AbstractModel {

    constructor(attributes = {
        id: -1,
        name_en: null,
        name_fr: null,
        name_ar: null,
        color: null,
        attachments : [],
        claims : [],
        petitions: [],
        is_active : false,
    }, config = {
        apiUrl: apiDomain + '/public/themes',
    }) {
        super();
        this.id = attributes.id;
        this.name_en = attributes.name_en;
        this.name_fr = attributes.name_fr;
        this.name_ar = attributes.name_ar;
        this.color = attributes.color;
        this.attachments = attributes.attachments ;
        this.claims = attributes.claims ;
        this.petitions = attributes.petitions;
        this.is_active = attributes.is_active;

        this.config = config;
    }

    serialize(attributes = {
        id: -1,
        name_en: null,
        name_fr: null,
        name_ar: null,
        color: null,
        attachments : [],
        claims : [],
        petitions: [],
        is_active : false,
    }) {
        this.id = attributes.id;
        this.name_en = attributes.name_en;
        this.name_fr = attributes.name_fr;
        this.name_ar = attributes.name_ar;
        this.color = attributes.color;
        this.attachments = attributes.attachments ;
        this.claims = attributes.claims ;
        this.petitions = attributes.petitions;
        this.is_active = attributes.is_active;
    }

    async save() {
        throw "Not allowed methods"
    }

    async create() {
        throw "Not allowed methods"
    }
}
