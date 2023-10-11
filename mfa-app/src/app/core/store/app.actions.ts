import { createAction, props } from "@ngrx/store";

type TAlertType = 'success' | 'info' | 'warning' | 'error';

interface IAlert {
  title?: string;
  message: string;
  alertType?: TAlertType
}

export const showAlert = createAction(
  '[App] Show Alert',
  props<{options: IAlert}>()
)