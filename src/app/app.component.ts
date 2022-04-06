import 'reflect-metadata';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchProjects, selectProjects } from 'src/store/projects.store';
import { Observable } from 'rxjs';
import { AppState } from './app.module';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from 'src/components/create-project-dialog/create-project-dialog.component';
import { Project } from './classes/project.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public projects$: Observable<Project[]> = this.store.select(selectProjects);

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(fetchProjects());
  }

  openDialog(): void {
    this.dialog.open(CreateProjectDialogComponent);
  }
}
