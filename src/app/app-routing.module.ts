import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TestComponent } from './pages/test/test.component';
import { RouterPath } from './shared/enums/router.enums';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: RouterPath.Login, component: LoginComponent },
  {
    path: RouterPath.Home,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: RouterPath.Test, component: TestComponent },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RouterPath.Home,
  },
  { path: RouterPath.NotFound, component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
