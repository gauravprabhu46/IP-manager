import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IpManagerComponent } from './pages/ip-manager/ip-manager.component';

const routes: Routes = [
  {

    path: 'manage-ip',
    component: IpManagerComponent

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
