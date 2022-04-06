import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { CreateProjectInput } from 'src/app/classes/project.class';
import { createProject } from 'src/store/projects.store';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss'],
})
export class CreateProjectDialogComponent {
  public createProjectForm = new FormGroup({
    title: new FormControl(null, Validators.required),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private store: Store<AppState>
  ) {}

  public onClose(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.createProjectForm.valid) {
      const input: CreateProjectInput = {
        project: {
          title: this.createProjectForm.value.title as string,
        },
      };

      this.store.dispatch(createProject({ input }));
      this.dialogRef.close();
    }
  }
}
