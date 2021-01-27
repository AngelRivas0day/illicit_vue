<template>
    <div>
        <div class="event-snackbar">
            <div class="snackbar--inner">
                <div class="snackbar__event-title">
                    Dia del padre
                </div>
                <div class="snackbar__event-actions">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EventSnackBar'
}
</script>

<style lang="scss" scoped>
@import "../assets/css/vars";

.event-snackbar{
    position: fixed;
    width: 100%;
    height: 55px;
    z-index: 10;
    top: -200px;
    left: 0;
    background: red;
    .snackbar--inner{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        width: 100%;
        padding: 0 25px;
        height: 100%;
        .snackbar__event-title{
            font-size: 16px;
            @media #{$break-medium}{
                font-size: 20px;
            }
        }
    }
}
</style>