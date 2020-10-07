import { IMetadataProvider, PlayableTrack } from './interfaces';
import { observable } from 'mobx';

/**
 * A source agnostic media searcher object. It searches for media using the underlying metadata providers' it's setup with.
 *
 * @export
 * @class Searcher
 */

export class Searcher {
    @observable metadataProviders: IMetadataProvider[];

    constructor(metadataProviders?: IMetadataProvider[]) {
        this.metadataProviders = Array<IMetadataProvider>();
        if (metadataProviders) this.metadataProviders = metadataProviders;
    }

    addMetadataProvider(metadataProvider: IMetadataProvider) {
        // TODO (sms): Possibly add check to if this provider already exists.
        // Or maybe leave that to the lib user to handle!
        this.metadataProviders.push(metadataProvider);
    }

    search(query: string): Promise<PlayableTrack[]> {
        return Promise.all(Array.from(this.metadataProviders, (mp) => mp.search(query))).then((mpResults) => {
            const searchResults = new Array<PlayableTrack>();
            mpResults.forEach((playableTracks) => {
                console.log(playableTracks);
                searchResults.push(...playableTracks);
            });
            return searchResults;
        });
    }
}
