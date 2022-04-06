export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export interface CreateProjectInput {
  project: {
    title: string;
  };
}

export interface CreateTodoInput {
  todo: {
    project_id: number;
    text: string;
    isCompleted: boolean;
  };
}

export interface UpdateTodoInput {
  projectId: number;
  todoId: number;
  todo: {
    text?: string;
    isCompleted?: boolean;
  };
}

export interface UpdateProjectInput {
  id: number;
  project: {
    title?: string;
  };
}

export interface DeleteProjectInput {
  id: number;
}

export interface DeleteTodoInput {
  projectId: number;
  todoId: number;
}

export class Project {
  constructor(public id: number, public title: string, public todos: Todo[]) {}

  public getUpdateProjectInput(project: Partial<Project>): UpdateProjectInput {
    return {
      id: this.id,
      project,
    };
  }

  public getUpdateTodoInput(
    todoId: number,
    todo: Partial<Todo>
  ): UpdateTodoInput {
    return {
      projectId: this.id,
      todoId,
      todo,
    };
  }

  public getDeleteProjectInput(): DeleteProjectInput {
    return { id: this.id };
  }
  public getDeleteTodoInput(todoId: number): DeleteTodoInput {
    return { projectId: this.id, todoId };
  }
}
