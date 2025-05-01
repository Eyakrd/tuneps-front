import { Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { HomeComponent } from './home/home.component';
import { FormulComponent } from './formul/formul.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { adminGuard } from './guards/admin.guard';
import { employeeGuard } from './guards/employee.guard';
import { userGuard } from './guards/user.guard';
import { roleGuard } from './guards/role.guard';
import { ChatComponent } from './chat/chat.component';
import { PowerbidashbordgestionComponent } from './powerbidashbordgestion/powerbidashbordgestion.component';
import { DisplayDashboardComponent } from './display-dashboard/display-dashboard.component';
import {EmployeeManagementComponent} from './employee-management/employee-management.component';
import {SignalementAdminComponent} from './signalement-admin/signalement-admin.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'info', component: InfoComponent },
    { path: 'Appel des citoyens', component: FormulComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'formul', component: FormulComponent ,canActivate:[userGuard]},
    { path: 'admin', component: AdminComponent,canActivate:[roleGuard] ,data:{'role': ['ADMIN']}},
    { path: 'employee', component: EmployeeComponent ,canActivate:[employeeGuard]},
    { path: 'chat', component: ChatComponent },
    {path: 'dashbordGest', component: PowerbidashbordgestionComponent} ,
    {path: 'dashboard', component: DisplayDashboardComponent} ,
    {path: 'employeeGest',component: EmployeeManagementComponent},
    {path: 'lesSignalement',component: SignalementAdminComponent}

];
