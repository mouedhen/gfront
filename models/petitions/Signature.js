import {AbstractModel} from "../core/AbstractModel";
import {apiDomain} from "../config";

export class Signature extends AbstractModel {
    constructor(attributes = {
        id: -1,
        petition_id: null,
        petitioner_id: null,
    }, config = {
        apiUrl: apiDomain + '/public/signatures',
    }) {
        super();
        this.serialize(attributes);
        this.config = config;
    }

    serialize(attributes = {
        id: -1,
        petition_id: null,
        petitioner_id: null,
    }) {
        this.id = attributes.id;
        this.petition_id = attributes.petition_id;
        this.petitioner_id = attributes.petitioner_id;
    }
}
