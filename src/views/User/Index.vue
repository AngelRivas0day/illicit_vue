<template>
    <div id="profile" class="container">
        <div class="row">
            <div class="col-12">
                <md-tabs
                    ref="userTabs"
                    @md-changed="onTabChange"
                    md-alignment="centered"
                >
                    <md-tab id="profile-settings" md-label="Perfil">
                        <settings />
                        <update-password />
                    </md-tab>
                    <md-tab
                        id="profile-addresses"
                        md-label="Direcciones de envío"
                    >
                        <addresses />
                    </md-tab>
                    <md-tab id="profile-history" md-label="Compras">
                        <history />
                    </md-tab>
                </md-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import Settings from "@/views/User/Settings.vue";
import History from "@/views/User/History.vue";
import Addresses from "@/views/User/Addresses.vue";
import UpdatePassword from "@/views/User/UpdatePassword.vue";

export default {
    name: "User",
    components: {
        Settings,
        History,
        Addresses,
        UpdatePassword,
    },
    data: () => ({
        activeTab: null,
    }),
    mounted() {
        if (this.$route.query.active_tab) {
            this.activeTab = this.$route.query.active_tab;
            this.$refs.userTabs.activeTab = this.activeTab;
        }
    },
    methods: {
        onTabChange(activeTab) {
            this.activeTab = activeTab;
            let query = { ...this.$route.query, active_tab: activeTab };
            let newUrl = `${this.$route.path}?${new URLSearchParams(query).toString()}`;
            window.history.pushState({}, "", newUrl);
        },
    },
};
</script>

<style lang="scss" scoped>
#profile {
    margin-top: 60px;
    min-height: calc(100vh - 55px);
}
</style>
