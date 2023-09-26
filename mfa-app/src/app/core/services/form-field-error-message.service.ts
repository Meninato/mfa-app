import { Injectable } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

const messages = new Map<string, {message: string, validatorErrorsKey?: string[]}>([
  [ 'required',  { message : 'Este campo é necessário.'} ],
  [ 'minlength', { message : 'Informe ao menos {0} caracteres', validatorErrorsKey :['requiredLength']}],
  [ 'email',     { message:  'O formato do email não parece estar correto.'}]
]);

@Injectable()
export class FormFieldErrorMessageService {
  constructor() {}

  getValidatorErrorMessage (validatorName: string, validatorErrors?: ValidationErrors): string | undefined {
    const args = messages.get(validatorName)?.validatorErrorsKey?.map(name => validatorErrors?.[name]);
    return (args) ? this.stringFormat(messages.get(validatorName)?.message,...args) : messages.get(validatorName)?.message;
  }

  private stringFormat(template: string|undefined, ...args: any[]) {
    if(template){
        return template.replace(/{(\d+)}/g, (match, index) => {
        return typeof args[index] !== 'undefined'
            ? args[index]
            : match;
        });
    }
    return undefined;
 }
}