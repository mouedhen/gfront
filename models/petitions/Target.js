import {AbstractModel} from "../core/AbstractModel";
import {apiDomain} from "../config";

export class Target extends AbstractModel {

    constructor(attributes = {
        id: -1,
        name_en: null,
        name_fr: null,
        name_ar: null,
    }, config = {
        apiUrl: apiDomain + '/public/targets',
    }) {
        super();
        this.id = attributes.id;
        this.name_en = attributes.name_en;
        this.name_fr = attributes.name_fr;
        this.name_ar = attributes.name_ar;

        this.config = config;
    }

    serialize(attributes = {
        id: -1,
        name_en: null,
        name_fr: null,
        name_ar: null,
    }) {
        this.id = attributes.id;
        this.name_en = attributes.name_en;
        this.name_fr = attributes.name_fr;
        this.name_ar = attributes.name_ar;
    }
}
