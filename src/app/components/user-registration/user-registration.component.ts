import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { values } from 'lodash-es';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  userService = inject(UserService);

  registrationStatus: {success: boolean, message: string} = {success: false, message: 'Not attempted yet'}; // success false is the default value...

  form = new FormGroup({
    givenName: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
  },
  this.passwordConfirmsValidator
);

  passwordConfirmsValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({passwordMismatch: true});
      return {passwordMismatch: true}
    }
    return {}
  }

// onSubmit()  is the button click event handler
  onSubmit(value: any) {  // value are the data of the form and any is the type of the value, we can have any type of value
    console.log(value);
    const user = this.form.value as User;
    delete user["confirmPassword"];

    this.userService.registerUser(user).subscribe({
      next: (response) => {
        console.log("User Registered", response.msg);
        this.registrationStatus = {success: true, message: response.msg};
      },
      error: (response) => {
        const message = response.error.msg;
        console.log("Error Registering user", message);
        this.registrationStatus = {success: false, message: message};
      }
    })
  }
  
  registerAnotherUser() {
    this.form.reset();
    this.registrationStatus = {success: false, message: 'Not attempted yet'}; // reseting also the default status!!!
  }

  check_dublicate_email() {
    const email = this.form.get('email').value;
    this.userService.check_duplicate_email(email).subscribe({
      next: (response) => {
        console.log(response.msg);
        this.form.get('email').setErrors(null);  // we send empty object.
      },
      error: (response) => {
        const message = response.error.msg;
        console.log("Email already exists", message);
        this.form.get('email').setErrors({dublicateEmail: true});
      }
    })
  }

}
