import { Schema, arrayOf } from 'normalizr';

export const todo = new Schema('todos');
export const arrayOfToDos = arrayOf(todo);
