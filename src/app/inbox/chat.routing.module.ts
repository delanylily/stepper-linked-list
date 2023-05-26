import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { InboxComponent } from "./inbox.component";

const routes = [
  {
    path: '',
    component: InboxComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
