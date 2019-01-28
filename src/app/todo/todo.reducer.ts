import { Todo } from './models/todo.model';
import * as fromTodo from './todos.actions';
import { LIMPIAR_COMPLETADOS_TODO } from './todos.actions';

const estadoInicial: Todo[] = [
 new Todo('Vencer a Thanos'),
 new Todo('Salvar el mundo'),
 new Todo('Pedir prestado el traje a Tony')
];
estadoInicial[0].completado = true;

export function todoReducer ( state = estadoInicial,
                              action: fromTodo.Acciones ): Todo[] {

  switch (action.type) {
    case fromTodo.AGREGAR_TODO:
      const todo = new Todo( action.texto );
      return [...state, todo ];

    case fromTodo.TOGGLE_TODO:
      return state.map(s => {

        if ( s.id === action.id ) {
          return {
                  ...s,
                  completado: !s.completado
                };

        } else {

          return s;

        }
      });
    case fromTodo.TOGGLE_ALL_TODO:
      return state.map(s => {
        return {...s, completado: action.completado};
      });
    case fromTodo.EDITAR_TODO:

      return state.map(s => {
        if ( s.id === action.id ) {
          return {...s, texto: action.texto};

        } else {

          return s;

        }
      });
    case fromTodo.BORRAR_TODO:
      return state.filter( s => action.id !== s.id);

    case fromTodo.LIMPIAR_COMPLETADOS_TODO:
      return state.filter( s => !s.completado);

    default:
      return state;
  }

}
