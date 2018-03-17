import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule}           from '@angular/material/select';
import {MatMomentDateModule}       from '@angular/material-moment-adapter';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatDatepickerModule,
  MatListModule, MatProgressSpinnerModule, MatSidenavModule, MatGridListModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatMomentDateModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatGridListModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatGridListModule
  ]
})
export class MaterialModule {}
