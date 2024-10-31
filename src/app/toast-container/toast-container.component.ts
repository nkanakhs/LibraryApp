import { Component, inject } from '@angular/core';
import { ToastService } from '../Services/toast-service';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet,NgFor],
  templateUrl: './toast-container.component.html',
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
  styleUrl: './toast-container.component.css'
})
export class ToastsContainer {
  toastService = inject(ToastService);

  trackToast(index: number, toast: any) {
    return toast; // Use the toast object as a unique identifier
  }
}
