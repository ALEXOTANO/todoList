import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { SetFiltroAction } from '../../filter/filter.actions';
import { Todo } from '../models/todo.model';
import { LimpiarCompletadosAction } from '../todos.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {
  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;
  pendientes: number;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.contarPendientes( state.todos );
    })
  }

  cambiarFiltro(nuevoFiltro: fromFiltro.filtrosValidos) {

    this.store.dispatch(new SetFiltroAction(nuevoFiltro) );

  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(todo => todo.completado === false).length;
  }

  limpiarCompletados() {
    this.store.dispatch(new LimpiarCompletadosAction() );
  }
}
