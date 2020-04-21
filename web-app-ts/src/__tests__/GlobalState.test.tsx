import React from 'react';
import { render } from '@testing-library/react';

import { GlobalContextProvider } from '../context/GlobalState';

describe('<GlobalContextProvider />', () => {
    test('is a childless provider', () => {
        const { container, getByText } = render(<GlobalContextProvider></GlobalContextProvider>);
        expect(container.children.length).toEqual(0);
    });
});
