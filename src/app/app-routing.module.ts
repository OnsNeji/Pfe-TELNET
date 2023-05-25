import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { AuthGuard } from 'app/guards';
import { ProfileComponent } from './components/profile/profile.component';
import { SiteComponent } from './components/site/site.component';
import { DepartementComponent } from './components/departement/departement.component';
import { PosteComponent } from './components/poste/poste.component';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { EmployeMoisComponent } from './components/employe-mois/employe-mois.component';
import { EvenementComponent } from './components/evenement/evenement.component';
import { MediaEventComponent } from './components/evenement/media-event/media-event.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ConventionComponent } from './components/convention/convention.component';
import { NouveauteComponent } from './components/nouveaute/nouveaute.component';
import { MariageComponent } from './components/mariage/mariage.component';
import { ProjectSuccessComponent } from './components/project-success/project-success.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { DemandeComponent } from './components/demande/demande.component';
import { DemandeGuard } from './guards/demande.guard';
import { DashComponent } from './components/dash/dash.component';
import { CongeComponent } from './components/conge/conge.component';
import { CongéGuard } from './guards/congé.guard';
import { CategorieComponent } from './components/categorie/categorie.component';


const routes: Routes = [

  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: '/accueil',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./components/extra-pages/pages.module').then(m => m.PagesModule)
      },
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'project-management',
        loadChildren: () => import('./components/project-management/project-management.module').then(m => m.ProjectManagementModule)
      },
      {
        path: 'human-resources',
        loadChildren: () => import('./components/human-resources/human-resources.module').then(m => m.HumanResourcesModule)
      }
    ]
  },
  {
    path: '**', redirectTo: 'pages/page-not-found'
  },
  { path: 'profil/:id', component: ProfileComponent },
  { path: 'site', component: SiteComponent, canActivate: [AuthGuard] },
  { path: 'departement', component: DepartementComponent, canActivate: [AuthGuard] },
  { path: 'poste', component: PosteComponent, canActivate: [AuthGuard] },
  { path: 'utilisateur', component: UtilisateurComponent, canActivate: [AuthGuard] },
  { path: 'employeMois', component: EmployeMoisComponent, canActivate: [AuthGuard] },
  { path: 'evenement', component: EvenementComponent, canActivate: [AuthGuard] },
  { path: 'mediaEvent', component: MediaEventComponent, canActivate: [AuthGuard] },
  { path: 'accueil', component: AccueilComponent },
  { path: 'convention', component: ConventionComponent, canActivate: [AuthGuard] },
  { path: 'nouveauté', component: NouveauteComponent, canActivate: [AuthGuard] },
  { path: 'mariage-naissance', component: MariageComponent, canActivate: [AuthGuard] },
  { path: 'project-success', component: ProjectSuccessComponent, canActivate: [AuthGuard] },
  { path: 'agenda/:id', component: AgendaComponent },
  { path: 'demandes', component: DemandeComponent, canActivate: [AuthGuard, DemandeGuard] },
  { path: 'demande/:id', component: DemandeComponent, canActivate: [AuthGuard] },
  { path: 'dash', component: DashComponent, canActivate: [AuthGuard] },
  { path: 'conges', component: CongeComponent, canActivate: [AuthGuard, CongéGuard] },
  { path: 'conge/:id', component: CongeComponent, canActivate: [AuthGuard] },
  { path: 'categorie', component: CategorieComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
