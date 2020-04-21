import React from 'react';
import { render } from '@testing-library/react';

import { GlobalContextProvider } from '../context/GlobalState';

describe('<GlobalContextProvider />', () => {
    test('it should render a childless provider', () => {
        render(<GlobalContextProvider></GlobalContextProvider>);
    });
});
