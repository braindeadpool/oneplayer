import axios, { AxiosInstance } from 'axios';
import { ITrackInfo, IMetadataProvider, PlayableTrack } from '../interfaces';
import { YouTubeProvider } from '../mediaproviders/youtubeProvider';

const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3/';

export interface YouTubeTrackInfo extends ITrackInfo {}

export class YouTubeMetadata implements IMetadataProvider {
    private _apiKey: string;
    private _webAPIAxiosInstance: AxiosInstance;
    private _youtubeProvider: YouTubeProvider;
    constructor(apiKey: string, youtubeProvider: YouTubeProvider) {
        this._youtubeProvider = youtubeProvider;
        this._apiKey = apiKey;
        this._webAPIAxiosInstance = axios.create({
            baseURL: YOUTUBE_API_BASE_URL,
        });
        // this._webAPIAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this._apiKey}`;
        this._webAPIAxiosInstance.defaults.headers.put['Content-Type'] = 'application/json';
    }

    getTrackInfo(trackID: string): Promise<YouTubeTrackInfo> {
        return this._webAPIAxiosInstance.get(`videos/${trackID}`).then((response) => {
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
                    part: 'snippet',
                    key: this._apiKey,
                },
            })
            .then((response) => {
                let trackResults = new Array<PlayableTrack>();

                if (response.status == 200) {
                    for (let track of response.data.items) {
                        trackResults.push(this._getPlayableTrackFromSearchResult(track));
                    }
                }
                return trackResults;
            })
            .catch((response) => {
                console.log('YouTube search failed with response', response);
                return Array<PlayableTrack>();
            });
    }

    _getPlayableTrackFromSearchResult(trackData: any): PlayableTrack {
        const trackInfo = {
            source: trackData.id.videoId,
            trackName: trackData.snippet.title,
            durationInMilliseconds: trackData.duration_ms,
            artistName: '',
            imageURL: trackData.snippet.thumbnails['default'].url,
        };
        return this._youtubeProvider.makePlayableTrack(trackInfo, trackData.id.videoId);
    }
}
