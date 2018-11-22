<template>
    <div @click="test">
        {{hello}}
    </div>
</template>


<script>
export default {
    data () {
        return {
            hello: "你好",
            name: "halo"
        }
    },
    methods: {
        test () {
            console.log(11111);
        }
    },
    props: {
        message: String
    }
}
</script>

