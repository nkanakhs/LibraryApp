import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirm-modal',
    standalone: true,
    templateUrl: './confirm-modal.component.html',
  })
export class ConfirmModalComponent {
    modal = inject(NgbActiveModal);
}
