<template>
    <div class="loader">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
</template>

<script>
export default {
    name: 'BaseLoading'
}
</script>

<style lang="css">
.loader{
    min-height: 100vH;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(43deg, #000000, #696969, #c1c1c1, #ffffff);
    background-size: 800% 800%;
    animation: gradient_ 17s ease infinite;
}

@keyframes gradient_ {
    0%{background-position:0% 90%}
    50%{background-position:100% 11%}
    100%{background-position:0% 90%}
}

</style>