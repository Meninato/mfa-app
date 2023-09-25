import { AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from "@angular/forms";

export class SubmitFormGroup extends FormGroup {

  /**
   * Sets a form to submitted state on ngSubmit
   */
  private _isSubmitted = false;

  constructor(controls: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, isSubmitted = false) {
    super(controls, validatorOrOpts, asyncValidator);
    this._isSubmitted = isSubmitted;
  }

  get isSubmitted(): boolean {
    return this._isSubmitted;
  }

  set isSubmitted(value: boolean) {
    this._isSubmitted = value;
  }

  override reset(value?: any, options?: { onlySelf?: boolean | undefined; emitEvent?: boolean | undefined; } | undefined): void {
    super.reset(value, options);
    this.isSubmitted = false;
  } 
}