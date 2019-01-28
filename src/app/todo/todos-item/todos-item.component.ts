import { ToggleAction, EditarTodoAction } from './../todos.actions';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { BorrarTodoAction } from '../todos.actions';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styles: []
})
export class TodosItemComponent implements OnInit {
  editando: boolean;
  @Input() todo: Todo;
  @ViewChild('txtInputDOM') txtInputDOM: ElementRef;
  txtInput: FormControl;
  chkInput: FormControl;


  constructor(
              private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.txtInput = new FormControl( this.todo.texto, Validators.required );
    this.chkInput = new FormControl( this.todo.completado );
    this.chkInput.valueChanges.subscribe( () => {
      this.store.dispatch( new ToggleAction(this.todo.id) );
    });
  }

  editar(editar: boolean) {
    if (editar) {

      this.editando = true;
      setTimeout(() => {
        this.txtInputDOM.nativeElement.select();
      }, 1);

    } else {
      this.editando = false;
      this.todo.texto = this.txtInput.value;
      this.store.dispatch( new EditarTodoAction(this.todo.id, this.txtInput.value) );

    }
  }

  borrar() {
    this.store.dispatch( new BorrarTodoAction( this.todo.id ) );
  }

}
