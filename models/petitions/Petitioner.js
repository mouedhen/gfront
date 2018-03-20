import {apiDomain} from "../config";
import {AbstractModel} from "../core/AbstractModel";

export class Petitioner extends AbstractModel{

    constructor(attributes = {
        id: -1,
        name: null,
        phone_number: null,
        mail: null,
        address: null
    }, config = {
        apiUrl: apiDomain + '/public/petitioners',
    }) {
        super();
        this.id = attributes.id;
        this.name = attributes.name;
        this.phone_number = attributes.phone_number;
        this.mail = attributes.mail;
        this.address = attributes.address;

        this.config = config;
    }

    serialize(attributes = {
        id: -1,
        name: null,
        phone_number: null,
        mail: null,
        address: null
    }) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.phone_number = attributes.phone_number;
        this.mail = attributes.mail;
        this.address = attributes.address;
    }
}
