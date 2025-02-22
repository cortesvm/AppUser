import { Component, Input } from '@angular/core';
import { IUser } from '../../interface/iuser';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() miUser!: IUser;
}
