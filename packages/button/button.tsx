import { defineComponent } from 'vue'
export default defineComponent({
    name: 'ch-button',

    setup(_, { slots, attrs }) {
        console.log(slots, attrs)
        console.log(slots.default?.())
        return () => {

            const buttonNode = (
                <button class="ch-button">
                    { slots.default?.() }
                </button>
            )
            return buttonNode
        }
    }
})