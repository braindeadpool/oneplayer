import React, { useContext } from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';

import { SliderBar } from '../components/playerbar/SliderBar';

describe('<SliderBar />', () => {
    test('renders a default slider bar', () => {
        render(<SliderBar />);
    });
});
