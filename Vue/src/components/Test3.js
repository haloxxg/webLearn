import Getdata from "../utils/GetData";
import Test2 from "components/Test2";

/* 
在单页面文件中，是无法确定这个组件的父组件，也就是无法在定义子组件时直接确定其父组件
，无法直接确定功能组件
*/
export default Getdata({
    id: "Test3",
    component: Test2
})
