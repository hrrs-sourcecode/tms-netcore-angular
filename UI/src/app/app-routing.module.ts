import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NavMenuComponent } from './views/nav/nav-menu.component';
import { CreateTenderComponent } from './views/tender/create-tender.component';
import { DetailsTenderComponent } from './views/tender/details-tender.component';
import { EditTenderComponent } from './views/tender/edit-tender.component';
import { ListTenderComponent } from './views/tender/list-tender.component';
import { UserLoginComponent } from './views/user/user-login.component';

const routes: Routes =       
[ 
  { path: 'tenderList', component: ListTenderComponent },
  { path: 'tenderCreate', component: CreateTenderComponent },
  { path: 'userLogin', component: UserLoginComponent },
  { path: 'navMenu', component: NavMenuComponent },
  { path: 'tenderDetails/:id', component: DetailsTenderComponent },
  { path: 'tenderEdit/:id', component: EditTenderComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo:'tenderList', pathMatch: 'full' },
  { path: '**', redirectTo:'tenderList', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
