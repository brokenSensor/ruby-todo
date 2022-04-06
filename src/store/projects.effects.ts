import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MessageService } from 'src/services/message.services';
import { ProjectsService } from 'src/services/projects.services';
import {
  createProject,
  createTodo,
  deleteProject,
  deleteTodo,
  fetchProjects,
  setProjects,
  updateProject,
  updateTodo,
} from './projects.store';

@Injectable()
export class ProjectsEffects {
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProjects),
      mergeMap(() =>
        this.projectsService.getAll().pipe(
          map((projects) => setProjects({ projects })),
          catchError((err) => {
            this.messageService.createAlert(err.message);
            return EMPTY;
          })
        )
      )
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProject),
      mergeMap(({ input }) =>
        this.projectsService.createProject(input).pipe(
          map(() => {
            this.messageService.createAlert('Project created!');
            return fetchProjects();
          }),
          catchError((err) => {
            this.messageService.createAlert(err.message);
            return EMPTY;
          })
        )
      )
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTodo),
      mergeMap(({ input }) =>
        this.projectsService.createTodo(input).pipe(
          map(() => {
            this.messageService.createAlert('Todo created!');
            return fetchProjects();
          }),
          catchError((err) => {
            this.messageService.createAlert(err.message);
            return EMPTY;
          })
        )
      )
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProject),
      mergeMap(({ input }) =>
        this.projectsService.updateProject(input).pipe(
          map(() => {
            this.messageService.createAlert('Project updated!');
            return fetchProjects();
          }),
          catchError((err) => {
            this.messageService.createAlert(err.message);
            return EMPTY;
          })
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      mergeMap(({ input }) =>
        this.projectsService.updateTodo(input).pipe(
          map(() => {
            this.messageService.createAlert('Todo updated!');
            return fetchProjects();
          }),
          catchError((err) => {
            this.messageService.createAlert(err.message);
            return EMPTY;
          })
        )
      )
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProject),
      mergeMap(({ input }) =>
        this.projectsService.deleteProject(input).pipe(
          map(() => {
            this.messageService.createAlert('Project deleted!');
            return fetchProjects();
          }),
          catchError((err) => {
            this.messageService.createAlert(err.message);
            return EMPTY;
          })
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      mergeMap(({ input }) =>
        this.projectsService.deleteTodo(input).pipe(
          map(() => {
            this.messageService.createAlert('Todo deleted!');
            return fetchProjects();
          }),
          catchError((err) => {
            this.messageService.createAlert(err.message);
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private messageService: MessageService
  ) {}
}
