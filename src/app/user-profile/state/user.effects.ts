import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { updateUser, userUpdated } from "./user.actions";

@Injectable({ providedIn: 'root' })
export class UserEffects {
  updateUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateUser),
      map(action => this.userService.updateUser(action.userId, action.user).subscribe(user => this.store.dispatch(userUpdated({ user }))))
    ),
    { dispatch: false }
  );

  constructor(private readonly actions$: Actions, private readonly store: Store, private userService: UserService) {

  }
}
