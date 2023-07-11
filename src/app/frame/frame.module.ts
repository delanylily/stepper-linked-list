import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { FrameComponent } from "./frame.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FrameComponent, HeaderComponent],
  exports: [FrameComponent]
})

export class FrameModule { }
