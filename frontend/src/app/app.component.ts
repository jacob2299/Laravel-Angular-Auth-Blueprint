import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { NotifcationRepository } from './repositories/auth/notification.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private notificationRepository: NotifcationRepository,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.notificationRepository.info$.subscribe(s => { if (s) { this.toastr.info(s); } });
    this.notificationRepository.warning$.subscribe(s => { if (s) { this.toastr.warning(s); } });
    this.notificationRepository.success$.subscribe(s => { if (s) { this.toastr.success(s); } });
    this.notificationRepository.error$.subscribe(s => { if (s) { this.toastr.error(s); } });
  }
}
