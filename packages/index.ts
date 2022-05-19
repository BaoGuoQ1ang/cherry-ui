import { App } from 'vue'
import ChButton from './button'
import ChSchedule from './schedule'

const components = [ ChButton, ChSchedule ]

const install = (app: App) => {
    components.map((component) => app.component(component.name, component))
}

export {
    ChButton,
    ChSchedule
}

export default {
    install
}