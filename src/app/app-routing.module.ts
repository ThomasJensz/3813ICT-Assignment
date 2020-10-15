import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuperComponent } from './super/super.component';
import { GroupComponent } from './group/group.component';
import { AssisComponent } from './assis/assis.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'super', component: SuperComponent},
  {path: 'group', component: GroupComponent},
  {path: 'assis', component: AssisComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }