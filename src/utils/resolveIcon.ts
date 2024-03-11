import { h, resolveComponent } from 'vue'

export default function resolveIcon(iconName: string) {
  return h(resolveComponent(iconName))
}
