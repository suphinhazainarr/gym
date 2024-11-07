import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  loginData = {
    name: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService) {} // Inject UserService

  // Login method
  login() {
    this.userService.login(this.loginData.name, this.loginData.password).subscribe(
      (response: { token: string }) => {  // Add response type
        console.log('Login successful', response);
        localStorage.setItem('authToken', response.token);
        window.location.href = '/dashboard';
      },
      (error: { message: string }) => {  // Add error type
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    );
  }
  
  register() {
    this.userService.register(this.registerData).subscribe(
      (response: any) => {
        console.log('Registration successful', response);
        alert('Registration successful! Please log in.');
        window.location.href = '/login';
      },
      (error: any) => {
        console.error('Registration error:', error);
        if (error.status === 0) {
          alert('Network error. Please check your connection.');
        } else if (error.status === 400) {
          alert('Bad request. Please check the input data.');
        } else {
          alert('Registration failed. Please try again.');
        }
      }
    );
  }
  
  
}
