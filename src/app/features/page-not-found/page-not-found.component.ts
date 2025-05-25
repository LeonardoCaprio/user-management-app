import { Component } from '@angular/core';
import { ErrorComponent } from "../../shared/error/error.component";

@Component({
  selector: 'app-page-not-found',
  imports: [ErrorComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
