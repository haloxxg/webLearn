<template>
    <GetData>
        <div slot-scope="slotProps">{{slotProps.state.name}}</div>
    </GetData>
</template>

<script>
export default {
    props: ['hello'],
    methods: {
        getCount() {

        }
    }
}
</script>

