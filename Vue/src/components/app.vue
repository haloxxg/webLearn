<template>
    <div>
        <router-view></router-view>
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
    props: {
        message: String
    }
}
</script>

