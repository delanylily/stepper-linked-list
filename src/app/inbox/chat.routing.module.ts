import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { InboxComponent } from "./inbox.component";
import { ChatComponent } from "./chat.component";

const routes = [
  {
    path: '',
    component: ChatComponent

    // component: InboxComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
