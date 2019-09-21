import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';

export default function Routes() {
    return (
        <BrowserRouter>
            {/* exact = procura extamente pela rota passada no browser */}
            <Route path="/" exact component={Login} />

            {/* pode-se passar 'novas' propriedades dentro de uma rota
                exemplo: <Route path="/main" prop1 = 1 prop2 = 2 component={Main} />
             */}
            <Route path="/devs/:id" component={Main} />
        </BrowserRouter>
    )
}
