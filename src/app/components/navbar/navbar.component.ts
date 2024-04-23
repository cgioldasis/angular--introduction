import { Component, inject } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  // Inject the UserService
  userService = inject(UserService);
  // Get the user from the UserService
  user = this.userService.user;

  // logout the user
  logout() {
    this.userService.logoutUser();
  }

}
