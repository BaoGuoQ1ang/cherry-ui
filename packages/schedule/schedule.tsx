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

            const node = (
                <div class={`${prefixCls}-schedule`}>
                    <div class={`${prefixCls}-schedule-header`}>
                        <div class={`${prefixCls}-schedule-option`}></div>
                        <div class={`${prefixCls}-schedule-explain`}>
                            <div class={`${prefixCls}-schedule-h-selected`}>{ props.selectedText }</div>
                            <div class={`${prefixCls}-schedule-h-selectable`}>{ props.selectableText }</div>
                        </div>
                    </div>
                </div>
            )
            return node
        }
    }
})