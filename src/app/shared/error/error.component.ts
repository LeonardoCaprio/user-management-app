import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  standalone: true,
})
export class ErrorComponent {
  @Input() imageSrc: string = '';
  @Input() errorTitle: string = '';
  @Input() errorMessage: string = '';
  @Input() handleRetry!:() => void;
  @Input() showRetry: boolean = false;
}
