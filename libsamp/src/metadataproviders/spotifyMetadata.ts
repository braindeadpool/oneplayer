import axios, { AxiosInstance } from 'axios';
import { ITrackInfo, IMetadataProvider, PlayableTrack } from '../interfaces';
import { SpotifyProvider } from '../mediaproviders/spotifyProvider';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1/';

export interface SpotifyTrackInfo extends ITrackInfo {}

export class SpotifyMetadata implements IMetadataProvider {
    private _accessToken: string;
    private _webAPIAxiosInstance: AxiosInstance;
    private _spotifyProvider: SpotifyProvider;
    constructor(accessToken: string, spotifyProvider: SpotifyProvider) {
        this._spotifyProvider = spotifyProvider;
        this._accessToken = accessToken;
        this._webAPIAxiosInstance = axios.create({
            baseURL: SPOTIFY_API_BASE_URL,
        });
        this._webAPIAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this._accessToken}`;
        this._webAPIAxiosInstance.defaults.headers.put['Content-Type'] = 'application/json';
    }

    getTrackInfo(trackID: string): Promise<SpotifyTrackInfo> {
        return this._webAPIAxiosInstance.get(`tracks/${trackID}`).then((response) => {
            return {
                source: trackID,
                trackName: response.data.name,
                durationInMilliseconds: response.data.duration_ms,
                artistName: response.data.artists[0].name,
                imageURL: response.data.album.images[0].url,
            };
        });
    }

    search(query: string): Promise<PlayableTrack[]> {
        //TODO (sms): Implement a more comprehensive search.
        // Currently, it only searches for matching tracks (not albums, artists, etc)
        return this._webAPIAxiosInstance
            .get('search/', {
                params: {
                    q: `${query}`,
                    type: 'track,episode',
                },
            })
            .then((response) => {
                let trackResults = new Array<PlayableTrack>();

                if (response.status == 200) {
                    for (let track of response.data.tracks.items) {
                        trackResults.push(this._getPlayableTrackFromSearchResult(track));
                    }
                }
                return trackResults;
            })
            .catch((response) => {
                console.log('Spotify search failed with response', response);
                return Array<PlayableTrack>();
            });
    }

    _getPlayableTrackFromSearchResult(trackData: any): PlayableTrack {
        const trackInfo = {
            source: trackData.id,
            trackName: trackData.name,
            durationInMilliseconds: trackData.duration_ms,
            artistName: trackData.artists[0].name,
            imageURL: trackData.album.images[0].url,
        };
        return this._spotifyProvider.makePlayableTrack(trackInfo, trackData.id);
    }
}
