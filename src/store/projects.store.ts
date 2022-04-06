import { createAction, createReducer, on, props } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import {
  CreateProjectInput,
  CreateTodoInput,
  DeleteProjectInput,
  DeleteTodoInput,
  Project,
  UpdateProjectInput,
  UpdateTodoInput,
} from 'src/app/classes/project.class';

export interface ProjectsState {
  projects: Project[];
}

export const initialState: ProjectsState = {
  projects: [],
};

export const fetchProjects = createAction('[Projects] FetchProjects');
export const createProject = createAction(
  '[Projects] CreateProject',
  props<{ input: CreateProjectInput }>()
);
export const createTodo = createAction(
  '[Projects] CreateTodo',
  props<{ input: CreateTodoInput }>()
);
export const updateProject = createAction(
  '[Projects] UpdateProject',
  props<{ input: UpdateProjectInput }>()
);
export const updateTodo = createAction(
  '[Projects] UpdateTodo',
  props<{ input: UpdateTodoInput }>()
);
export const deleteProject = createAction(
  '[Projects] DeleteProject',
  props<{ input: DeleteProjectInput }>()
);
export const deleteTodo = createAction(
  '[Projects] DeleteTodo',
  props<{ input: DeleteTodoInput }>()
);

export const setProjects = createAction(
  '[Projects] SetProjects',
  props<{ projects: Project[] }>()
);

export const selectProjects = (state: AppState) => state.projects.projects;

export const projectsReducer = createReducer(
  initialState,
  on(setProjects, (store, { projects }) => ({ ...store, projects }))
);
