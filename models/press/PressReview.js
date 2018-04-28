import {apiDomain} from "../config";
import {OldAbstractModel} from "../core/OldAbstractModel";

export class PressReview extends OldAbstractModel {

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
