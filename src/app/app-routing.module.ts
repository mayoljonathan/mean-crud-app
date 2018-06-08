import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { EntryComponent } from 'src/app/pages/entry/entry.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';

export const appRoutingComponents = [ 
  EntryComponent,
  HomeComponent, 
  ListComponent,
];

export const routes: Routes = [
  { path: 'entry', component: EntryComponent },
  { path: '', component: HomeComponent },
  { path: 'list', component: ListComponent },
  // ** is anything that isnt found in the routes will go to HomeComponent (START VIEW)
  { path: '**', component: EntryComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}