import { App } from 'vue'
import Schedule from './schedule'

Schedule.install = (app: App) => {
    app.component(Schedule.name, Schedule)
}

export default Schedule