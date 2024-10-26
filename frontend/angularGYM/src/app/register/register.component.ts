import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  registerForm: FormGroup;

  constructor(private fb:FormBuilder, private userService: UserService){
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  onSubmit(): void{
    if(this.registerForm.valid){
      this.userService.registerUser(this.registerForm.value).subscribe(
        (response) =>{
          console.log('User registerUser successfully:' ,response);
          alert("User registered successfully");

        },
        (error)=>{
          console.log('registration failed :', error);
          alert("failed!!!")
        }
      );
    }
  }


}
