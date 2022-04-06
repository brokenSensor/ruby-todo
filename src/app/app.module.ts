import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { projectsReducer, ProjectsState } from 'src/store/projects.store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectsService } from 'src/services/projects.services';
import { APIInterceptor } from 'src/services/api.interceptor';
import { ProjectsEffects } from 'src/store/projects.effects';
import { ProjectsListComponent } from '../components/projects-list/projects-list.component';
import { CreateTodoDialogComponent } from 'src/components/create-todo-dialog/create-todo-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateProjectDialogComponent } from 'src/components/create-project-dialog/create-project-dialog.component';
import { MessageService } from 'src/services/message.services';

export interface AppState {
  projects: ProjectsState;
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent,
    CreateTodoDialogComponent,
    CreateProjectDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    StoreModule.forRoot({ projects: projectsReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([ProjectsEffects]),
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  providers: [
    ProjectsService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
