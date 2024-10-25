import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
}
