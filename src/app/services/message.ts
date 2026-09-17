import { Injectable, signal } from '@angular/core';
import { Message, MessageType } from '../types/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly messageSignal = signal<Message | null>(null);

  readonly message = this.messageSignal.asReadonly();

  show(text: string, type: MessageType): void {
    this.messageSignal.set({
      text,
      type,
    });
  }

  clear(): void {
    this.messageSignal.set(null);
  }
}
