<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <img class="measure-image" src="" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Measures',
}
</script>

<style lang="scss" scoped>
.container{
    .measure-image{
        width: 500px;
        height: 500px;
        object-fit: contain;
        display: block;
        margin: 0 auto 15px auto;
    }
}
</style>