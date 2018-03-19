import {AbstractModel} from "../core/AbstractModel";
import {apiDomain} from "../config";

export class PressReview extends AbstractModel {

  constructor(attributes = {
    id: -1,
    url: '',
  }, config = {
    apiUrl: apiDomain + '/public/reviews',
  }) {
    super();
    this.serialize(attributes);
    this.config = config;
  }

  serialize(attributes = {
    id: -1,
    url: '',
  }) {
    this.id = attributes.id;
    this.url = attributes.url;
  }

}
