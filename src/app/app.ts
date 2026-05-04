import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHome } from './components/app-home/app-home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHome],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
