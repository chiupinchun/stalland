import { Component, Input } from '@angular/core';
import { AvatarComponent } from "app/common/avatar/avatar.component";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input()
  content?: string
  @Input()
  img?: string
  @Input()
  options?: {
    text: string
    onSelect: () => void
  }[]

  @Input()
  optionHeight = 40
  @Input()
  optionGap = 10
}
