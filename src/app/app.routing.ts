import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'example'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
        ]
    },

     // Admin routes
     {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'enquete', loadChildren: () => import('app/modules/admin/enquetes/enquetes.module').then(m => m.EnquetesModule)},
        ]
    },

    // Admin routes
     {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'contatos', loadChildren: () => import('app/modules/admin/contatos/contatos.module').then(m => m.ContatosModule)},
        ]
    },

    // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'empresa', loadChildren: () => import('app/modules/admin/empresas/empresas.module').then(m => m.EmpresasModule)},
        ]
    },

        // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'transmissao', loadChildren: () => import('app/modules/admin/transmissoes/transmissoes.module').then(m => m.TransmissoesModule)},
        ]
    },
       // Admin routes
       {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'pergunta', loadChildren: () => import('app/modules/admin/perguntas/perguntas.module').then(m => m.PerguntasModule)},
        ]
    },
       // Admin routes
       {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'resposta', loadChildren: () => import('app/modules/admin/add-respostas/add-respostas.module').then(m => m.AddRespostasModule)},
        ]
    },
     // Admin routes
     {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'editrespostas', loadChildren: () => import('app/modules/admin/edit-respostas/edit-respostas.module').then(m => m.EditRespostasModule)},
        ]
    },
     // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboards/dashboards.module').then(m => m.DashboardsModule)},
        ]
    },
     // Admin routes
     {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'results', loadChildren: () => import('app/modules/admin/results/results.module').then(m => m.ResultsModule)},
        ]
    },
     // Admin routes
     {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'relatorios', loadChildren: () => import('app/modules/admin/relatorios/relatorios.module').then(m => m.RelatoriosModule)},
        ]
    },
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'transformar', loadChildren: () => import('app/modules/admin/htmltopdf/htmltopdf.module').then(m => m.HtmltopdfModule)},
        ]
    },
     // Admin routes
     {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'demografica', loadChildren: () => import('app/modules/admin/demografica/demografica.module').then(m => m.DemograficaModule)},
        ]
    },
    // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'respostaDemo', loadChildren: () => import('app/modules/admin/add-demografica/add-demografica.module').then(m => m.AddDemograficaModule)},
        ]
    },
     // Admin routes
     {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'relatorioDemo', loadChildren: () => import('app/modules/admin/relatorio-demografica/relatorio-demografica.module').then(m => m.RelatorioDemograficaModule)},
        ]
    },
     // Admin routes
     {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'relatorioPremiadas', loadChildren: () => import('app/modules/admin/relatorio-premiada/relatorio-premiada.module').then(m => m.RelatorioPremiadaModule)},
        ]
    },
      // Admin routes
      {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'editRespostas', loadChildren: () => import('app/modules/admin/edit-respostas/edit-respostas.module').then(m => m.EditRespostasModule  )},
        ]
    },
];

