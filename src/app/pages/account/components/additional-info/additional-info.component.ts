import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {SystemService} from "../../../../shared/service/system.service";
import {AdditionalData} from "../../../../shared/interface/apiInterface";
import {TranslateModule} from "@ngx-translate/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
  systemService = inject(SystemService);
  additionalData: AdditionalData = { description: '' };
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.systemService.getAdditionalData().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.additionalData = res.result;
    })
  }
}
