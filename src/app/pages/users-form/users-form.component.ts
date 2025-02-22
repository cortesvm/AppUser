import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormControlName, ReactiveFormsModule, Validator, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interface/iuser';
import { UserService } from '../../service/user.service';






@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css'
})
export class UsersFormComponent {

  router = inject(Router);
  UserService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  
  userForm: FormGroup;
  tipo: string;

  isNewObject: boolean = true;
//arrUsers: Iuser[];
// isNewObject: boolean = true;
  
  
  constructor(){
    this.tipo = "Insertar";
    this.userForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required, Validators.minLength(0), Validators.maxLength(130)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      image: new FormControl(null, [Validators.required, Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      repitePassword: new FormControl(null, [Validators.required, Validators.minLength(5)])
    }, { validators: this.passValidator });
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params._id) {
        this.tipo = "Actualizar"
        const userResponse : IUser = await this.UserService.getById(params._id);
  
        this.userForm = new FormGroup({
          _id: new FormControl(userResponse._id, []),
          first_name: new FormControl(userResponse.first_name, [Validators.required]),
          last_name: new FormControl(userResponse.last_name, [Validators.required]),
          username: new FormControl(userResponse.username, [Validators.required, Validators.minLength(0), Validators.maxLength(130)]),
          email: new FormControl(userResponse.email, [Validators.required, Validators.email]),
          image: new FormControl(userResponse.image, [Validators.required, Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/)]),
          password: new FormControl(userResponse.password,[Validators.required, Validators.minLength(5)]),
          repitePassword: new FormControl(userResponse.password, [Validators.required, Validators.minLength(5)]),
        }, []);
      }
    });
  }

  getDataForm() {

      let usuario: IUser = this.userForm.value;
      console.log('Formulario antes de la actualización:', usuario); 
    
      console.log(this.userForm.valid);
      if (this.userForm.valid) {
        if (this.tipo === "Actualizar") {
          console.log('Actualizando'); 
          this.UserService.updateUsuario(usuario)
            .then((_response: any): void => {
              alert(`The user ${_response.username} has been successfully updated`);
              this.router.navigate(['/home']);
            })
            .catch((error: any): void => {
              alert(`Error updating the user`);
            });
        } else {
          console.log('Insertando'); 
          this.UserService.insertUsuario(usuario)
            .then((_response: any): void => {
              alert(`The user ${_response.username} has been successfully updated`);
              this.router.navigate(['/home']);
            })
            .catch((error: any): void => {
              alert(`Error updating the user`);
            });
          }
        }
      }       
  
      checkControl(FormControlName: string, validators: string): boolean | undefined {
              return this.userForm.get(FormControlName)?.hasError(validators) && this.userForm.get(FormControlName)?.touched;
            }
            passValidator(formValue: AbstractControl): any{
              const pass1 = formValue.get('password')?.value;
              const pass2 = formValue.get('repitePassword')?.value;
              return (pass1 != pass2) ? {'passwordnotmatches' : true} : null
            }
  }
  
  
