import { defineComponent, computed } from 'vue'
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
        return () => {
            const classs = classNames({
                [`${prefixCls}-schedule`]: true
            })

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
                                <tbody>
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