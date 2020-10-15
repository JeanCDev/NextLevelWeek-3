import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/landing';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';

function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/orphanages" component={OrphanagesMap} />

        <Route path="/orphanage/create" component={CreateOrphanage} />
        <Route path="/orphanage/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;