import axios, { AxiosInstance } from 'axios';
import { ITrackInfo, IMetadata } from '../interfaces';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1/';

export interface SpotifyTrackInfo extends ITrackInfo {
    source: string;
    trackName: string;
    durationInMilliseconds: number;
    artistName: string;
    imageURL: string;
}

export class SpotifyMetadata implements IMetadata {
    private _accessToken: string;
    private _webAPIAxiosInstance: AxiosInstance;
    constructor(accessToken: string) {
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
                trackName: response['name'],
                durationInMilliseconds: response['duration_ms'],
                artistName: response['artists'][0]['name'],
                imageURL: response['images'][0]['url'],
            };
        });
    }
}
