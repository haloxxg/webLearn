<template>
    <div>
        <Test :hello="hello"></Test>
        <div>父组件Message is: {{hello.name}}</div>
        <div>父组件状态树：{{this.$store.state.count}}</div>
    </div>
</template>

<script>
import Test from "components/Test"

export default {
    data() {
        return {
            hello: {name: "xxg", age: 25}
        }
    },
    methods: {
        getCount() {

        }
    },
    components: {
        Test
    }
}
</script>

