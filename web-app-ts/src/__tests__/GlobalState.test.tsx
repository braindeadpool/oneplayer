import React from 'react';
import { render } from '@testing-library/react';

import { GlobalStoreContextProvider } from '../context/GlobalState';

describe('<GlobalStoreContextProvider />', () => {
    test('is a childless provider', () => {
        const { container, getByText } = render(<GlobalStoreContextProvider></GlobalStoreContextProvider>);
        expect(container.children.length).toEqual(0);
    });
});
