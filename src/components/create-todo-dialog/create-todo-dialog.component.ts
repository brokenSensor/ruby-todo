import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { CreateTodoInput } from 'src/app/classes/project.class';
import { createTodo } from 'src/store/projects.store';

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.scss'],
})
export class CreateTodoDialogComponent {
  public createTodoForm = new FormGroup({
    text: new FormControl(null, Validators.required),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateTodoDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number }
  ) {}

  public onClose(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.createTodoForm.valid) {
      const input: CreateTodoInput = {
        todo: {
          project_id: this.data.projectId,
          text: this.createTodoForm.value.text as string,
          isCompleted: false,
        },
      };

      this.store.dispatch(createTodo({ input }));
      this.dialogRef.close();
    }
  }
}
