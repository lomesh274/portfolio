import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { ProjectsComponent } from './components/projects/projects.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'projects',
        component:ProjectsComponent
    },
    {
        path: '**',
        component: NoPageFoundComponent
    }
];
