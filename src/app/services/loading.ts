import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly loadingIdsSignal = signal<Set<number>>(new Set());

  readonly loadingIds = this.loadingIdsSignal.asReadonly();

  start(id: number): void {
    this.loadingIdsSignal.update(ids => {
      const next = new Set(ids);
      next.add(id);
      return next;
    });
  }

  stop(id: number): void {
    this.loadingIdsSignal.update(ids => {
      const next = new Set(ids);
      next.delete(id);
      return next;
    });
  }

  isLoading(id: number): boolean {
    return this.loadingIdsSignal().has(id);
  }
}
