import { NgModule } from '@angular/core';
import { AppComponent } from '@app/app.component';

import { CoreModule } from './core/core.module';


// export function initApplication(store: Store<AppState>) {
//   return () =>
//     new Promise(resolve => {
//       const loaded$ = new Subject();
//       store.dispatch(new LoadSystem());
//       store
//         .select((state:AppState) => state.isLoaded)
//         .pipe(takeUntil(loaded$))
//         .subscribe(loaded => {
//           if (loaded) {
//             loaded$.next();
//             resolve();
//           }
//         });
//     });
// }

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
