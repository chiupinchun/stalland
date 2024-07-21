import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LARGE_SIZE, NORMAL_SIZE, SMALL_SIZE } from '@constants/avatar';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  @Input()
  src!: string
  @Input()
  alt = ''
  @Input()
  width?: number
  @Input()
  height?: number
  @Input()
  size?: 'large' | 'normal' | 'small' | number = 'normal'
  @Input()
  class = ''
  @Input()
  imgClass = ''
  @Output()
  onClick = new EventEmitter()

  getSize() {
    const size: Partial<{ width: number, height: number }> = {}

    if (this.width) {
      size.width = this.width
    }
    if (this.height) {
      size.height = this.height
    }

    switch (this.size) {
      case 'large':
        size.width ??= LARGE_SIZE
        size.height ??= LARGE_SIZE
        break
      case 'normal':
        size.width ??= NORMAL_SIZE
        size.height ??= NORMAL_SIZE
        break
      case 'small':
        size.width ??= SMALL_SIZE
        size.height ??= SMALL_SIZE
        break
      default:
        if (typeof this.size === 'number') {
          size.width ??= this.size
          size.height ??= this.size
        }
    }

    return size
  }

  handleClick() {
    this.onClick.emit()
  }
}
