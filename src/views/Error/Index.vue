<template>
    <div class="error">
        <div class="error-inner">
            <h1>UPS!</h1>
            <p>Algo sali&oacute; muy mal...</p>
            <md-button class="md-raised md-dense" to="/">Volver el inicio</md-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Error'
}
</script>

<style lang="scss" scoped>
.flex{
    display: flex;
    justify-content: center;
    align-items: center;
}
.error{
    height: 100vH;
    width: 100%;
    @extend .flex; 
    &-inner{
        @extend .flex; 
        width: 100%;
        box-sizing: border-box;
        padding: 0 50px;
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>