import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './src/app/app.component.html',
  styleUrls: ['./src/app/app.component.scss']
})

export class AppComponent {
  title = 'Angular Bootstrap boilerplate demo app';
  textField = 'bla bla';
}
