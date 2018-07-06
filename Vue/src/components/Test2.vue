<template>
    <div>
        <div>{{a.name}}</div>
        <button @click="handleClick">click</button>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Tool from '../utils/Tool'

export default {
    props: ['hello'],
    computed: mapState(['a']),
    methods: {
        handleClick() {
            let state =  {name: "AA"};
            this.setState({id:"a", state});
        },
        setState: mapMutations(["setState"]).setState
    }
}
</script>

