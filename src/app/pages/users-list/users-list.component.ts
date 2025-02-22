import { Component, inject } from '@angular/core';
import { IUser } from '../../interface/iuser';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  
  arrUsers: IUser[];
  userService = inject(UserService);
  paginaActual: number;
  usersPerPage: number;
  allPages: number;

  constructor() {
    this.arrUsers = [];
    this.paginaActual= 1;
    this.usersPerPage= 10;
    this.allPages = 0;
  }
 

  ngOnInit(): void {
    

    this.userService.getAllUsers(this.paginaActual, this.usersPerPage).subscribe((data: any) => {
      //console.log(data);

      this.allPages = data.total_pages;
      this.usersPerPage = data.per_page; 
      this.arrUsers = data.results;
    });
  }

  // calcularPaginasTotales(totalUsers: any) {
  //   console.log(this.arrUsers.length);
  //   console.log(this.arrUsers.length / this.usersPerPage);
  //   console.log(Math.ceil(this.arrUsers.length / this.usersPerPage));
  //   this.allPages = Math.ceil(totalUsers / this.usersPerPage);
  // }

  // get usuariosPorPagina(): IUser[] {
  //   const inicio = (this.paginaActual - 1) * this.usersPerPage;
  //   return this.arrUsers.slice(inicio, inicio + this.usersPerPage);
  // }

  siguientePagina() {
    if (this.paginaActual < this.allPages) {
      this.paginaActual++;

      this.userService.getAllUsers(this.paginaActual, this.usersPerPage).subscribe((data: any) => {
        //console.log(data);
        this.arrUsers = data.results;
      });
    }
  }

  anteriorPagina() {
    if (this.paginaActual > 1) {
      this.paginaActual--;

      this.userService.getAllUsers(this.paginaActual, this.usersPerPage).subscribe((data: any) => {
        //console.log(data);
        this.arrUsers = data.results;
      });
    }
  }
}
