import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app-state.interface';
import { NotificationActions } from '../../states/notification/notification.actions';
import { Repository } from '../repository.abstract';

@Injectable()
export class NotifcationRepository extends Repository {

  constructor(
    protected store: Store<AppState>,
    protected notificationActions: NotificationActions
  ) {
    super(store, notificationActions);
  }
}
