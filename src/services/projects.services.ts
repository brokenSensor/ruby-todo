import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import {
  CreateProjectInput,
  CreateTodoInput,
  DeleteProjectInput,
  DeleteTodoInput,
  Project,
  Todo,
  UpdateProjectInput,
  UpdateTodoInput,
} from 'src/app/classes/project.class';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>('/projects').pipe(
      map((projects) => {
        return plainToInstance(Project, projects);
      })
    );
  }

  createProject(input: CreateProjectInput): Observable<Project> {
    return this.http.post<Project>('/projects', input);
  }

  createTodo(input: CreateTodoInput): Observable<Todo> {
    return this.http.post<Todo>('/todos', input);
  }

  updateProject(input: UpdateProjectInput): Observable<Project> {
    return this.http.patch<Project>(`/projects/${input.id}`, input);
  }

  updateTodo(input: UpdateTodoInput): Observable<Todo> {
    return this.http.patch<Todo>(
      `/projects/${input.projectId}/todo/${input.todoId}`,
      input
    );
  }

  deleteProject(input: DeleteProjectInput) {
    return this.http.delete(`/projects/${input.id}`);
  }

  deleteTodo(input: DeleteTodoInput) {
    return this.http.delete(
      `/projects/${input.projectId}/todo/${input.todoId}`
    );
  }
}
