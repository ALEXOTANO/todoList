import { Todo } from './todo/models/todo.model';
import { ActionReducerMap } from '@ngrx/store';
import * as formTodo from './todo/todo.reducer';
import * as formFiltro from './filter/filter.reducer';
import { filtrosValidos } from './filter/filter.actions';


export interface AppState {
  todos: Todo[];
  filtro: filtrosValidos;
}

export const APP_REDUCERS: ActionReducerMap<AppState> = {
  todos: formTodo.todoReducer,
  filtro: formFiltro.filtroReducer
};
