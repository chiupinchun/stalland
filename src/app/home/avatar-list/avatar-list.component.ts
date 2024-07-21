import { Component, EventEmitter, Output } from '@angular/core';
import { AvatarComponent } from "../../common/avatar/avatar.component";
import { Spirit, spirits } from 'config/spirit';

@Component({
  selector: 'app-avatar-list',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './avatar-list.component.html',
  styleUrl: './avatar-list.component.scss'
})
export class AvatarListComponent {
  spirits = spirits

  @Output()
  onSpeak = new EventEmitter<Spirit['key']>()

  handleSpeak(spirit: Spirit) {
    this.onSpeak.emit(spirit.key)
  }
}
