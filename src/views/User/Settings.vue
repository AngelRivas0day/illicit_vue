<template>
    <div>
        <md-card class="my-4">
            <md-card-header>
                <div class="md-title">Detalles de la cuenta</div>
            </md-card-header>
            <md-card-content>
                <form class="row">
                    <div class="col-12" v-if="showStoreReference && storeName">
                        <md-card class="md-primary">
                            <md-card-content class="py-2">
                                Este usuario está asignado a la ubicación
                                {{ storeName }}
                            </md-card-content>
                        </md-card>
                    </div>
                    <div class="col-12" v-if="showVerificationEmailWarning">
                        <request-error-message
                            message="Por favor verifica tu correo electrónico para poder utilizar todas las funcionalidades de la aplicación."
                            @closed-message="showVerificationEmailWarning = false"
                        />
                    </div>
                    <div class="col-12" v-if="errorMessage">
                        <request-error-message
                            :message="errorMessage"
                            @closed-message="errorMessage = null"
                        />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <md-field>
                            <md-tooltip md-direction="bottom">
                                El correo electr&oacute;nico no puede ser modificado.
                            </md-tooltip>
                            <label> Correo electr&oacute;nico </label>
                            <md-input v-model="email" disabled></md-input>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <md-field>
                            <md-tooltip v-if="disableBirthDayField" md-direction="bottom">
                                La fecha de nacimiento no puede ser modificada.
                            </md-tooltip>
                            <label> Fecha de nacimiento </label>
                            <md-input
                                v-model="form.birth_day"
                                type="date"
                                :disabled="disableBirthDayField"
                            ></md-input>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <md-field
                            :class="{
                                'md-invalid':
                                    $v.form.name.$invalid && $v.form.name.$dirty,
                            }"
                        >
                            <label>Nombre</label>
                            <md-input
                                @blur="$v.form.name.$touch"
                                v-model="form.name"
                            ></md-input>
                            <span class="md-error" v-if="!$v.form.name.required">
                                El nombre es requerido.
                            </span>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <md-field
                            :class="{
                                'md-invalid':
                                    $v.form.last_name.$invalid &&
                                    $v.form.last_name.$dirty,
                            }"
                        >
                            <label>Apellido</label>
                            <md-input
                                @blur="$v.form.last_name.$touch"
                                v-model="form.last_name"
                            ></md-input>
                            <span class="md-error" v-if="!$v.form.last_name.required">
                                El apellido es requerido.
                            </span>
                        </md-field>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <md-field
                            :class="{
                                'md-invalid':
                                    $v.form.phone_number.$invalid &&
                                    $v.form.phone_number.$dirty,
                            }"
                        >
                            <label>Tel&eacute;fono</label>
                            <md-input
                                @blur="$v.form.phone_number.$touch"
                                v-model="form.phone_number"
                                v-mask="'+## ## #### ####'"
                            ></md-input>
                            <span class="md-error" v-if="!$v.form.phone_number.required">
                                El tel&eacute;fono es requerido.
                            </span>
                        </md-field>
                    </div>
                </form>
            </md-card-content>
            <md-card-actions>
                <md-button
                    :disabled="loading || $v.form.$invalid"
                    class="md-raised md-primary md-dense"
                    @click="onSubmit"
                >
                    {{ loadingSubmit ? "Guardando..." : "Guardar" }}
                </md-button>
            </md-card-actions>
        </md-card>
        <md-card v-if="promoCodeUsage" class="md-dark md-dense my-4">
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">Tu código promocional</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content>
                <div class="row">
                    <div class="col-12">
                        <div v-if="promoCodeUsage.usedBy">
                            Ha sido usado por
                            {{ promoCodeUsage.usedBy }}
                        </div>
                        <div v-else>
                            <p>
                                Tu código promocional no ha sido usado aún. Regala 100 MXN
                                a un amigo compartiendo tu código promocional.
                            </p>
                            <md-chip class="md-primary" md-clickable>
                                <md-icon>content_copy</md-icon>
                                <span @click="copyPromoCode">Copiar código</span>
                            </md-chip>
                        </div>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { Get, Patch } from "@/services/api";
import RequestErrorMessage from "@/components/RequestErrorMessage.vue";

export default {
    name: "Settings",
    components: { RequestErrorMessage },
    async mounted() {
        await this.fetchData();
    },
    data: () => ({
        loading: false,
        loadingSubmit: false,
        form: {
            name: null,
            last_name: null,
            phone_number: null,
            birth_day: null,
        },
        email: null,
        disableBirthDayField: false,
        errorMessage: null,
        showStoreReference: null,
        storeName: null,
        showVerificationEmailWarning: false,
        promoCodeUsage: null,
    }),
    methods: {
        /**
         * @description
         * The `fetchData` method will fetch only the settings of the user.
         * It is called when the user saves any changes in the settings.
         * @return {Promise<void>}
         */
        async fetchData() {
            try {
                this.errorMessage = null;
                this.loading = true;
                const [{ data: settings }, { data: promoCodeUsage }] = await Promise.all([
                    Get({
                        endpoint: "clients",
                        useToken: true,
                    }),
                    Get({
                        endpoint: "clients/my-promo-code",
                        useToken: true,
                    }),
                ]);
                const {
                    email,
                    type,
                    store_name = null,
                    email_verified,
                    ...restOfSettings
                } = settings;
                this.promoCodeUsage = promoCodeUsage;
                this.showVerificationEmailWarning = !email_verified;
                this.disableBirthDayField = !!restOfSettings.birth_day;
                this.email = email;
                this.loading = false;
                this.form = restOfSettings;
                this.showStoreReference = type.includes("store");
                if (this.showStoreReference && store_name) this.storeName = store_name;
            } catch (error) {
                this.errorMessage = error.response ? error.response.data : error.message;
                this.loading = false;
            }
        },
        /**
         * @description
         * The `onSubmit` method will call the API to update the settings of the user.
         * It is called when the user saves any changes in the settings, after
         * the `fetchData` method is called.
         * @return {Promise<void>}
         */
        async onSubmit() {
            try {
                this.errorMessage = null;
                this.loading = true;
                this.loadingSubmit = true;
                await Patch({
                    endpoint: "clients",
                    data: this.form,
                    useToken: true,
                });
                this.$notify({
                    group: "user",
                    type: "success",
                    title: "Guardado",
                    text: "Los cambios han sido guardados.",
                });
                this.loadingSubmit = false;
                // ?: The fetchData method will set the loading to false.
                await this.fetchData();
            } catch (error) {
                this.errorMessage = error.response ? error.response.data : error.message;
                this.loading = false;
                this.loadingSubmit = false;
            }
        },
        copyPromoCode() {
            const el = document.createElement("textarea");
            el.value = this.promoCodeUsage.promoCode.id;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            this.$notify({
                group: "user",
                type: "success",
                title: "Copiado",
                text: "El c&oacute;digo promocional ha sido copiado.",
            });
        },
    },
    validations: {
        form: {
            name: {
                required,
            },
            last_name: {
                required,
            },
            phone_number: {
                required,
            },
            birth_day: {
                required,
            },
        },
    },
};
</script>

<style scoped lang="scss"></style>
