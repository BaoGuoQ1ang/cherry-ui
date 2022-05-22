import { defineComponent, computed, ref } from 'vue'
import classNames from '../_util/classNames'
import prefixCls from '../_util/prefixCls'
import './styles/index.ts'
export default defineComponent({
    name: 'ch-schedule',
    props: {
        selectedText: {
            type: String,
            default: '已选'
        },
        selectableText: {
            type: String,
            default: '可选'
        }
    },
    setup(props) {
        let startClientX = ref(0)
        let startClientY = ref(0)
        let moveClientX = ref(0)
        let moveClientY = ref(0)

        let left = ref(0)
        let top = ref(0)
        let width = ref(0)
        let height = ref(0)
        let start = ref(false)
        

        const tableRef = ref<HTMLElement | null>(null)
        
        return () => {

            // let tableTop = tableRef.value && tableRef.value
            const classs = classNames({
                [`${prefixCls}-schedule`]: true
            })
            console.log(tableRef.value && tableRef.value.offsetTop)
            const nodeText = computed(() => {
                return {
                    selectedText: props.selectedText
                }
            })

            const colspan = 24
            const time = 48
            const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

            const thTime = () => {
                const result = []
                for (let i = 0; i < colspan; i++) {
                    result.push(<td colspan={2}>{i}</td>)
                }
                return result
            }

            const timeNode = (weekData: number) => {
                const result = []
                for (let i = 0; i < 48; i++) {
                    result.push(
                        <td data-week={weekData} data-time={i}  class={`${prefixCls}-schedule-calendar-time`}></td>
                    )
                }
                return result
            }

            const weekNode = () => {
                const result = []
                for (let i = 0; i < week.length; i++) {
                    result.push(
                        <tr>
                            <td>{week[i]}</td>
                            {timeNode(i)}
                        </tr>
                    )
                }
                return result
            }

            function calHeight(num: number) {
                num % 30
            }

            
            const onMousedown = (event: MouseEvent) => {
                // console.log(event)
                start.value = true
                width.value = 0
                height.value = 0
                left.value = event.clientX
                top.value = event.clientY

                startClientX.value = event.clientX
                startClientY.value = event.clientY
                console.log(startClientX.value, startClientY.value)
            }

            const onMouseup = (event: MouseEvent) => {
                // console.log(event)
                start.value = false
                startClientX.value = 0
                startClientY.value = 0
            }

            const onMousemove = (event: MouseEvent) => {
                // console.log('startClientX: ', startClientX.value + ',' + startClientY.value)
                if (start.value) {
                    // console.log('鼠标滑过:', event)
                    moveClientX.value = event.clientX
                    moveClientY.value = event.clientY
                    if (startClientX.value > event.clientX) {
                        left.value = event.clientX
                    }
                    if (startClientY.value > event.clientY) {
                        top.value = event.clientY
                    }
                    width.value = Math.abs(moveClientX.value - startClientX.value)
                    height.value = Math.abs(moveClientY.value - startClientY.value)
                    if ((height.value / 30) % 1 !== 0) {
                        console.log(30 - (height.value % 30))
                        height.value += 30 - (height.value % 30)
                    }
                    // console.log('width: ' + width.value + ' height: ' + height.value)
                }
                
            }

            const style = {
                width: width.value + 'px',
                height: height.value + 'px',
                left: left.value + 'px',
                top: top.value + 'px',
                opacity: '0.6'
            }

            const moveModel = () => {
                if (start.value) {
                    return <div v-show={start} class={`${prefixCls}-schedule-rang`} style={style}></div>
                }
                return null
            }

            const node = (
                <div class={`${prefixCls}-schedule`}>
                    <div class={`${prefixCls}-schedule-header`}>
                        <div class={`${prefixCls}-schedule-option`}></div>
                        <div class={`${prefixCls}-schedule-explain`}>
                            <div class={`${prefixCls}-schedule-h-selected`}>{ props.selectedText }</div>
                            <div class={`${prefixCls}-schedule-h-selectable`}>{ props.selectableText }</div>
                        </div>
                    </div>
                    <div class={`${prefixCls}-schedule-calendar`}>
                        {JSON.stringify(style)}
                        {moveModel()}
                        <div class={`${prefixCls}-schedule-calendar-twrap`}>
                            <table class={`${prefixCls}-schedule-calendar-table`}>
                                <thead>
                                    <tr>
                                        <th rowspan="8" class="week-td">星期/时间</th>
                                        <th colspan={colspan}>00:00 - 12:00</th>
                                        <th colspan={colspan}>12:00 - 24:00</th>
                                    </tr>
                                    <tr>{ thTime() }</tr>
                                </thead>
                                <tbody onMousedown={ onMousedown } onMouseup={ onMouseup } onMousemove={ onMousemove } ref={tableRef}>
                                    { weekNode() }
                                    <tr>
                                        <td colspan="49" class={`${prefixCls}-schedule-calendar-tip`}>
                                            <div class="clearfix">
                                                <p>可拖动鼠标选择时间段</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
            return node
        }
    }
})