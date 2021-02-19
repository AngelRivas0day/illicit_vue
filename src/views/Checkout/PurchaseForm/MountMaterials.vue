<template>
    <div>
        <div class="mount-materials-step">
            <div class="container-fluid">
                <div class="row no-gutters">
                    <template v-for="m in materials">
                        <div :key="m.label" class="col-12 mb-1">
                            <div class="material d-flex flex-column text-white">
                                <div class="material-label mb-2 md-font">{{m.label}}</div>
                                <div class="material-text">{{m.text}}</div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MountMaterials',
    data: () => ({
        materials: [
            {
                label: 'Material 1',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
            },
            {
                label: 'Materal 2',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
            },
            {
                label: 'Material 3',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis, augue vel vehicula condimentum, mauris mauris pellentesque nulla.',
            }
        ]
    })
}
</script>

<style lang="scss" scoped>
.mount-materials-step{
    .material{
        max-width: 500px;
        margin: 16px 16px 16px 0;
        &-label{
            font-size: 18px;
        }
        &-text{
            font-size: 16px;
            line-height: 1.4em;
        }
    }
}
</style>