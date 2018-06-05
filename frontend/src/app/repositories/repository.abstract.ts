import { Store } from '@ngrx/store';
import { AppState } from '../states/app-state.interface';
import { NotificationActions } from '../states/notification/notification.actions';

export abstract class Repository {
  info$ = this.store.select(s => s.notification.info);
  warning$ = this.store.select(s => s.notification.warning);
  success$ = this.store.select(s => s.notification.success);
  error$ = this.store.select(s => s.notification.error);

  constructor(
    protected store: Store<AppState>,
    protected notificationActions: NotificationActions
  ) { }

  protected setInfo(message: string): void {
    this.store.dispatch(this.notificationActions.clearInfo());
    this.store.dispatch(this.notificationActions.setInfo(message));
  }

  protected setWarning(message: string): void {
    this.store.dispatch(this.notificationActions.clearWarning());
    this.store.dispatch(this.notificationActions.setWarning(message));
  }

  protected setSuccess(message: string): void {
    this.store.dispatch(this.notificationActions.clearSuccess());
    this.store.dispatch(this.notificationActions.setSuccess(message));
  }

  protected setError(message: string): void {
    this.store.dispatch(this.notificationActions.clearError());
    this.store.dispatch(this.notificationActions.setError(message));
  }
}
