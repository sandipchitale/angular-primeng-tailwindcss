import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ElectronService} from './core/services';
import {TranslateService} from '@ngx-translate/core';
import {APP_CONFIG} from '../environments/environment';

import {ButtonModule} from 'primeng/button';
import {TabsModule} from 'primeng/tabs';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ButtonModule, TabsModule, TableModule, ToolbarModule],
  providers: [ElectronService, TranslateService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  quit() {
    window.close();
  }
}
