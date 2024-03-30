import React from 'react';
import ReactDOM from 'react-dom/client';

import './themes/global.scss'

import Providers from './providers/providers.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Providers />
);
