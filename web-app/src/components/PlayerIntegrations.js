import React from 'react';
import youtubeIcon from '../assets/yt_icon_rgb.png'
import {create} from 'nano-css';

const nano = create();

nano.put('.playerIcon', {
    width: '30px',
    height: 'auto'
});

export function YoutubeIntegration() {
    return (
        <div>
            <img src={youtubeIcon} alt='youtube-icon' className='playerIcon'/>
        </div>
    );
}