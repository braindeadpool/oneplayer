import { IMetadataProvider, PlayableTrack } from './interfaces';
import { observable, action } from 'mobx';

/**
 * A source agnostic media searcher object. It searches for media using the underlying metadata APIs it's setup with.
 *
 * @export
 * @class Searcher
 */

export class Searcher {
    @observable metadataProviders: IMetadataProvider[];
    constructor() {}
}
