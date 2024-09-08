import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {AdditionalData} from "../../../../shared/interface/apiInterface";
import {TranslateModule} from "@ngx-translate/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SystemDataService} from "../../../../shared/service/system-data.service";

@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [
    UpperCasePipe,
    TranslateModule
  ],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.scss'
})
export class AdditionalInfoComponent implements OnInit {
  systemDataService = inject(SystemDataService);
  additionalData: AdditionalData = { description: '' };
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.systemDataService.AdditionalData$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      if (!res) return;
      this.additionalData = res
    })
  }
}
