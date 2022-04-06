import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import {
  DeleteProjectInput,
  DeleteTodoInput,
  Project,
  Todo,
  UpdateTodoInput,
} from 'src/app/classes/project.class';
import {
  deleteProject,
  deleteTodo,
  updateProject,
  updateTodo,
} from 'src/store/projects.store';
import { CreateTodoDialogComponent } from '../create-todo-dialog/create-todo-dialog.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  @Input() public projects!: Project[];

  private timeout!: any;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {}

  public toggleTodo(input: UpdateTodoInput): void {
    this.store.dispatch(updateTodo({ input }));
  }

  public onAdd(projectId: number): void {
    this.dialog.open(CreateTodoDialogComponent, {
      data: {
        projectId,
      },
    });
  }

  public onUpdateProject(event: any, project: Project): void {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.store.dispatch(
        updateProject({
          input: project.getUpdateProjectInput({
            title: event.srcElement.innerText as string,
          }),
        })
      );
    }, 3000);
  }

  public onDeleteProject(input: DeleteProjectInput): void {
    this.store.dispatch(deleteProject({ input }));
  }

  public onDeleteTodo(input: DeleteTodoInput): void {
    this.store.dispatch(deleteTodo({ input }));
  }

  public trackByProjects(_: number, project: Project): number {
    return project.id;
  }

  public trackByTodos(_: number, todo: Todo): number {
    return todo.id;
  }
}
