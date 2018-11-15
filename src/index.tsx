import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Detail from './containers/detail';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path='/' render={() => <Detail />}></Route>
        </Switch>
    </HashRouter>,
    document.getElementById('root')
)