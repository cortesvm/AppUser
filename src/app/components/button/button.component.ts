import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  userService = inject(UserService);
  router = inject(Router);
  @Input() _id: string;
  @Input() parent: string;
  @Input() username: string;

  constructor(){
    this._id= "";
    this.username= "";
    this.parent ="";
  }
  async borrar(_id: string) {
    let confirmacion = confirm(' Do you want to delete the user: ' + this._id + '?');
    if (confirmacion) {
      let response = await this.userService.deleteById(_id);

      if (response._id) {
        alert('The user has been successfully deleted ' + response.username);
        if (this.parent == 'view') {
          this.router.navigate(['/home']);
        }
        else if(this.parent == "card" ){
          location.reload();
        }
      }
    }
    
  }
}