import React from 'react'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store, {persistor} from '../redux/store.ts'

import AppRoute from '../routers/AppRoute.tsx'

function Providers() {
    return ( 
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppRoute />
            </PersistGate>
        </Provider>
     );
}

export default Providers;