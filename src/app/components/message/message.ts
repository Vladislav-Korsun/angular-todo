import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/message';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.html',
  styleUrl: './message.scss',
})
export class MessageComponent {
  private readonly messageService = inject(MessageService);

  readonly message = this.messageService.message;

  close(): void {
    this.messageService.clear();
  }
}
