/* 
在单页面文件中，是无法确定这个组件的父组件，也就是无法在定义子组件时直接确定其父组件
，无法直接确定功能组件
*/
export default {
    data() {
    	return {
    		name: "xxg"
    	}
    },
    template: `<div>
        子组件输入框<input v-model="name" placeholder="edit me">
        <button>add count</button>
        <p>子组件Message is: {{ name }}</p>
        <div>子组件状态树：{{ this.$store.state.count }}</div>
    </div>`,
}
