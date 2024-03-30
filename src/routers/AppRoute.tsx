import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {privateRouters, publicRouters} from '../routers/defineRoute.ts'
import {IRoute} from '../interfaces/common-interface.ts'

import NotFound from '../pages/NotFound/NotFound.tsx'
import ProtectRoute from '../pages/ProtectRoute/ProtectRoute.tsx'

function AppRoute() {
    return ( 
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route>
                    {publicRouters.map((route: IRoute) => {
                        const Comp = route.element
                        const Layout = route.layout

                        return <Route key={route.path} path={route.path} element={<Layout><Comp /></Layout>}/>
                    })}
                </Route>

                {/* Private routes */}
                <Route element={<ProtectRoute />}>
                    {privateRouters.map((route: IRoute) => {
                        const Comp = route.element
                        const Layout = route.layout

                        return <Route key={route.path} path={route.path} element={<Layout><Comp /></Layout>}/>
                    })}
                </Route>
                 
                {/* Not found */}
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
     );
}

export default AppRoute;