// import { createReducer, on } from "@ngrx/store";
// import { userUpdated } from "../user.actions";

// export const userFeatureKey = 'User';
// export interface UserState {
//   user: any;
// }
// const initialUserState: UserState = {
//   user: undefined
// };

// export function userReducer(state, action): UserState {
//   return _userReducer(state, action);
// }

// const _userReducer = createReducer(
//   initialUserState,
//   on(userUpdated, (state, action) => {
//     return {
//       ...state,
//       ...action.user
//     };
//   })
// );
