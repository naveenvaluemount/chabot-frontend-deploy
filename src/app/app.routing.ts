import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path:'',
        loadChildren:() => import('app/modules/user/user.module').then(m => m.UserModule)
    }, {
        path:'superadmin',
        loadChildren:() => import('app/modules/superadmin/superadmin.module').then(m => m.SuperAdminModule)
    }, {
        path:'admin',
        loadChildren:() => import('app/modules/admin/admin.module').then(m => m.AdminModule)
    }
];
