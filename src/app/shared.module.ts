import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularSplitModule } from 'angular-split';
import { AppMenuComponent } from './components/app-menu/app-menu';
import { MessageToastrComponent } from './components/message-toastr/message-toastr.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatButtonToggleModule,

    AngularSplitModule,

    DragDropModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  declarations: [
    AppMenuComponent,
    MessageToastrComponent
  ],
  exports: [
    FormsModule,
    RouterModule,

    AppMenuComponent,
    MessageToastrComponent,
    
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatButtonToggleModule,

    AngularSplitModule,
     DragDropModule
  ],
  providers: [DatePipe]
})

export class SharedModule { }
