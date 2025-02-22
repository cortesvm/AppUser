import { Component, inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interface/iuser';
import { ButtonComponent } from "../../components/button/button.component";


@Component({
  selector: 'app-users-view',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.css'
})
export class UsersViewComponent {

  UserService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  
  miUser!: IUser;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      let _id: string = params._id as string;
      this.UserService.getById(_id)
        .then((userResponse: IUser) => {
          console.log(userResponse);
          this.miUser = userResponse;
        })
        .catch((err: string) => {
          console.log("Error al llamar a la API: " + err);
        });
    });
  }
}

