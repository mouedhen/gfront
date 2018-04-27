import {AbstractModel} from "../core/AbstractModel";
import {apiDomain} from "../config";

export class Contact extends AbstractModel {
    constructor(attributes = {
        name: null,
        phone_number: null,
        email: null,
        subject: null,
        message: null,
    }, config = {
        apiUrl: apiDomain + '/public/contact',
    }) {
        super();
        this.serialize(attributes);
        this.config = config;
    }

    serialize(attributes = {
        name: null,
        phone_number: null,
        email: null,
        subject: null,
        message: null,
    }) {
        this.name = attributes.name;
        this.email = attributes.email;
        this.subject = attributes.subject;
        this.message = attributes.message;
    }

    async fetchAll(params) {
        throw "Not allowed methods"
    }
}
