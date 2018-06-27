<template>
    <div>
        <slot v-bind:state="state"></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            state: {
                name: "xxg",
                age: 12
            }
        }
    }
}
</script>

