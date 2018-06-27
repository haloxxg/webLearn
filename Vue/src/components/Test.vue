<template>
    <div>
        子组件输入框<input v-model="hello.name" placeholder="edit me">
        <button @click="getCount">add count</button>
        <p>子组件Message is: {{ hello.name }}</p>
        <div>子组件状态树：{{ this.$store.state.count }}</div>
    </div>
</template>

<script>
export default {
    props: ['hello'],
    methods: {
        getCount() {
            this.$store.state.count++
        }
    },
}
</script>
