import { Component } from '@angular/core';
import {Employee, EmployeeService} from '../services/employee.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-employee-management',
  imports: [FormsModule,CommonModule],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.css'
})
export class EmployeeManagementComponent {
  employees: any[] = [];
  newEmployee = {firstname: '', lastname: '', email: '', cin: '', password: '', status: 'ACTIVE'};

  constructor(private employeeService: EmployeeService) {
  }
  searchQuery: string = '';
  allEmployees: Employee[] = [];

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.employees = data;
      this.allEmployees = data;
    });
  }

  addEmployee() {
    console.log('Tentative d\'ajout d\'employé', this.newEmployee);

    if (!this.newEmployee.firstname || !this.newEmployee.lastname || !this.newEmployee.email || !this.newEmployee.cin || !this.newEmployee.password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    const existingEmployee = this.employees.find(emp => emp.cin === this.newEmployee.cin);
    if (existingEmployee) {
      alert('Un employé avec ce CIN existe déjà : ' + existingEmployee.firstname + ' ' + existingEmployee.lastname);

      // Réinitialiser le formulaire
      this.newEmployee = {
        firstname: '',
        lastname: '',
        email: '',
        cin: '',
        password: '',
        status: 'ACTIVE'
      };
      return;
    }

    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: () => {
        this.loadEmployees();
        this.newEmployee = {
          firstname: '',
          lastname: '',
          email: '',
          cin: '',
          password: '',
          status: 'ACTIVE'
        };
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout', err);
      }
    });
  }


  updateEmployee(employee: any) {
    this.employeeService.updateEmployee(employee.id, employee).subscribe(() => {
      this.loadEmployees();
      console.log('updated');
    });
  }

  changeStatus(userId: number, currentStatus: string) {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.employeeService.updateUserStatus(userId, newStatus).subscribe({
      next: (res) => {
        alert('Statut mis à jour: ' + newStatus);
        // Optionnel: refresh la liste des utilisateurs
        this.loadEmployees();
      },
      error: (err) => {
        console.error('Erreur HTTP:', err);
        alert('Erreur lors de la mise à jour du statut');
      }
    });
  }

  /*toggleStatus(employee: any) {
    const newStatus = employee.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.employeeService.changeStatus(employee.id, newStatus).subscribe(() => {
      this.loadEmployees();
    });
  }*/
  /* searchValue: string = '';

  rechercherEmployees() {
    this.employeeService.rechercherEmployees(this.searchValue, this.searchValue)
      .subscribe(data => {
        this.employees = data;
      });
  } */




  filterEmployees() {
    const query = this.searchQuery.toLowerCase();

    this.employees = this.allEmployees.filter(emp =>
      emp.cin.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query)
    );
  }
}
