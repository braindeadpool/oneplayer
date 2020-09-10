import { IMediaProvider, PlayableTrack, ITrackInfo } from '../interfaces';
import { MILLISECONDS_IN_SECOND } from '../constants';

interface YouTubeTrackInfo extends ITrackInfo {
    source: string;
}

enum YTPlayerState {
    UNSTARTED = -1,
    ENDED,
    PLAYING,
    PAUSED,
    BUFFERING,
    VIDEO_CUED,
}

export class YouTubeProvider implements IMediaProvider {
    private _player: any;
    private _attachPoint: HTMLElement;
    private _playerIsReady: boolean;
    /**
     * Creates an instance of YoutubeProvider.
     * @param {(Element | string)} _attachPoint the DOM Element or id of the dom element where the youtube player object will render to.
     * @memberof VideoJSProvider
     */
    constructor(_attachPointOrString: HTMLElement | string) {
        this._player = null;
        this._playerIsReady = false;
        if (typeof document === 'undefined') {
            console.log('YouTube IFrame API needs a client-side document.');
            return;
        }

        if (typeof _attachPointOrString === 'string') {
            const elementWithId = document.getElementById(_attachPointOrString);
            if (elementWithId === null) {
                this._attachPoint = document.createElement('div');
                this._attachPoint.setAttribute('id', _attachPointOrString);
            } else {
                this._attachPoint = elementWithId;
            }
        }

        /* Dynamically load the Youtube IFrame API */
        /* https://developers.google.com/youtube/iframe_api_reference */
        let tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

        (<any>window).onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
    }

    onYouTubeIframeAPIReady() {
        // Check if already loaded
        if (this._player != null && this._playerIsReady) {
            return;
        }
        this._player = new (<any>window).YT.Player(this._attachPoint, {
            height: '480',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            events: {
                onReady: this.onPlayerReady.bind(this),
                onStateChange: this.onPlayerStateChange.bind(this),
            },
            playerVars: {
                autoplay: 0,
                showinfo: 0,
                controls: 0,
            },
        });
        console.log('YT API Ready invoked!');
    }

    onPlayerReady(event: any) {
        console.log('YT Player Ready!');
        // Hack to allow full functionality
        this._player = event.target;
        this._playerIsReady = true;
    }

    onPlayerStateChange(event: any) {
        console.log('YT Player state changed!');
        console.log('Event: ', event);
    }

    init(): Promise<boolean> {
        if (this._player != null && this._playerIsReady) {
            return Promise.resolve(true);
        }

        return new Promise((resolve) => {
            // Wait 5 seconds for API to load
            setTimeout(() => {
                this.onYouTubeIframeAPIReady();
                resolve(true);
            }, 5000);
        });
    }

    getCurrentState() {
        return Promise.resolve(this._player.getPlayerState());
    }

    play(track: any | null = null) {
        console.log('youtubeProvider.play() called with', track);
        if (track) {
            this.setupTrack(track.source);
        }
        return new Promise<boolean>((resolve) => {
            this._player.playVideo();
            resolve(this._player.getPlayerState() == YTPlayerState.PLAYING);
        });
    }

    pause() {
        return new Promise<boolean>((resolve) => {
            this._player.pauseVideo();
            resolve(this._player.getPlayerState() == YTPlayerState.PAUSED);
        });
    }

    togglePlayPause() {
        if (this._player.getState() == 'paused' || this._player.getState() == 'cued') {
            this._player.play();
        } else {
            this._player.pause();
        }

        return Promise.resolve(true);
    }

    seekTo(targetTimeInMilliseconds: number) {
        return this._player.seekTo(targetTimeInMilliseconds / MILLISECONDS_IN_SECOND);
    }

    setVolume(volume: number) {
        this._player.setVolume(volume);
        return Promise.resolve(this._player.getVolume());
    }

    getVolume() {
        return Promise.resolve(this._player.getVolume());
    }

    getCurrentTrackTimeInMilliseconds() {
        return Promise.resolve(this._player.getCurrentTime() * MILLISECONDS_IN_SECOND);
    }

    makePlayableTrack(trackInfo: YouTubeTrackInfo, mediaID: string): PlayableTrack {
        // TODO: Validate the mediaID and trackInfo.
        return new PlayableTrack(trackInfo, this, mediaID);
    }

    setupTrack(track: any) {
        // load the video to be played
        this._player.loadVideoById(track.source);
        // we don't want to autoplay it here as soon as it loads.
        this._player.pauseVideo();
        return Promise.resolve(true);
    }
}
