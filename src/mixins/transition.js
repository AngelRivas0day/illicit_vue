export default {
    data: ()=>({
        isTransition: false
    }),
    methods: {
        transition(callback = () => ({})){
            this.isTransition = !this.isTransition
            setTimeout(function(){
                 this.isTransition = !this.isTransition
                 callback()
            }.bind(this), 800);
        }
    }
}