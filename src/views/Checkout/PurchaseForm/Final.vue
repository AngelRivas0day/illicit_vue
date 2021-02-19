<template>
    <div>
        <div class="final-step">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 mb-5">
                        <p class="mb-2 text-white">Recuerda actualizar tu graduaci&oacute;n por lo menos una vez al a&ntilde;o</p>
                        <div>
                            <div class="ml-0 d-flex align-items-center justify-content-start w-100 text-center" id="app">
                                <div class="py-5 px-5 border" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                                    <input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle" 
                                    class="d-none" @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png" />
                                    <label for="assetsFieldHandle" class="d-block cursor-pointer">
                                        <div class="text-white">
                                            Explain to our users they can drop files in here 
                                            or <u style="cursor: pointer;">click here</u> to upload their files
                                        </div>
                                    </label>
                                    <ul class="mt-4 list-style-none" v-if="this.filelist.length" v-cloak>
                                        <li class="text-white" v-for="file in filelist" :key="file">
                                            {{ file.name }}<button type="button" @click="remove(filelist.indexOf(file))" title="Remove file">x</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p class="mt-2 text-white help-text">¿Necesitas ayuda?</p>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-7">
                        <md-field>
                            <label>Comentarios adicionales</label>
                            <md-textarea></md-textarea>
                        </md-field>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Final',
    delimiters: ['${', '}'], // Avoid Twig conflicts
    data: () => ({
        filelist: [] 
    }),
    methods: {
        onChange() {
            this.filelist = [...this.$refs.file.files];
        },
        remove(i) {
            this.filelist.splice(i, 1);
        },
        dragover(event) {
        event.preventDefault();
            // Add some visual fluff to show the user can drop its files
            if (!event.currentTarget.classList.contains('bg-green-300')) {
                event.currentTarget.classList.remove('bg-gray-100');
                event.currentTarget.classList.add('bg-green-300');
            }
        },
        dragleave(event) {
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.onChange(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        }
    }
}
</script>

<style lang="scss" scoped>
.final-step{
    p{
        font-size: 18px;
        &.help-text{
            font-size: 16px;
        }
    }
}
</style>