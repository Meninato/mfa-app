import { NgModule } from "@angular/core";
import { FormControlErrorComponent } from "./components/form-control-error/form-control-error.component";
import { FormActionDirective } from "./directives/form-action.directive";
import { FormControlErrorAnchorDirective } from "./directives/form-control-error-anchor.directive";
import { FormControlErrorDirective } from "./directives/form-control-error.directive";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    FormControlErrorComponent, 
    FormActionDirective, 
    FormControlErrorAnchorDirective,
    FormControlErrorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormControlErrorComponent, 
    FormActionDirective, 
    FormControlErrorAnchorDirective, 
    FormControlErrorDirective
  ]
})
export class FormControlErrorModule {

}