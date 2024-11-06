import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WrapperComponent } from "./wrapper/wrapper.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { TopNavComponent } from "./top-nav/top-nav.component";
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WrapperComponent, HomepageComponent, TopNavComponent, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library-app';

  showNav = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Watch for route changes
    this.router.events.subscribe(() => {
      // Check the current URL to see if it's the "404" route
      this.showNav = this.router.url !== '/404';
    });
  }
}
