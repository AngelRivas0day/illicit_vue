<template>
    <div class="maps">
        <div class="maps-inner">
            <div class="maps__side" :class="[isTransitioning ? 'animate' : 'no-animate']">
                <div class="map__side-inner">
                    <h1>{{ currentLocation.street }}</h1>
                    <span> # {{ currentLocation.extNumber }} </span>
                    <p class="mb-4">
                        {{ currentLocation.description }}
                    </p>
                    <button
                        @click="openGoogleMaps(currentLocation.link)"
                        class="maps-button"
                    >
                        <div>GOOGLE MAPS</div>
                    </button>
                </div>
                <div class="map__side-controls">
                    <template v-if="showControls">
                        <button
                            class="controls--prev"
                            @click="prevLocation(currentLocationIndex)"
                        >
                            anterior
                        </button>
                        <button
                            class="controls--next"
                            @click="nextLocation(currentLocationIndex)"
                        >
                            siguiente
                        </button>
                    </template>
                </div>
            </div>
            <div
                class="maps__render-map"
                :class="[isTransitioning ? 'animate' : 'no-animate']"
            >
                <gmap-map
                    v-if="!loading"
                    class="map"
                    :center="currentLocation.marker"
                    :zoom="16"
                    :options="mapStyle"
                >
                    <gmap-marker :position="currentLocation.marker"></gmap-marker>
                </gmap-map>
            </div>
        </div>
    </div>
</template>

<script>
import { Get } from "@/services/api";
import { mapActions } from "vuex";
import transition from "@/mixins/transition";

export default {
    name: "Maps",
    mixins: [transition],
    computed: {
        showControls() {
            return this.locations.length > 1;
        },
    },
    async mounted() {
        this.setWhiteIcons();
        await this.fetchLocations();
    },
    data: () => ({
        mapStyle: {
            styles: [
                {
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#212121",
                        },
                    ],
                },
                {
                    elementType: "labels.icon",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#757575",
                        },
                    ],
                },
                {
                    elementType: "labels.text.stroke",
                    stylers: [
                        {
                            color: "#212121",
                        },
                    ],
                },
                {
                    featureType: "administrative",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#757575",
                        },
                    ],
                },
                {
                    featureType: "administrative.country",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#9e9e9e",
                        },
                    ],
                },
                {
                    featureType: "administrative.land_parcel",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#bdbdbd",
                        },
                    ],
                },
                {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#757575",
                        },
                    ],
                },
                {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#181818",
                        },
                    ],
                },
                {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#616161",
                        },
                    ],
                },
                {
                    featureType: "poi.park",
                    elementType: "labels.text.stroke",
                    stylers: [
                        {
                            color: "#1b1b1b",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "geometry.fill",
                    stylers: [
                        {
                            color: "#2c2c2c",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#8a8a8a",
                        },
                    ],
                },
                {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#373737",
                        },
                    ],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#3c3c3c",
                        },
                    ],
                },
                {
                    featureType: "road.highway.controlled_access",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#4e4e4e",
                        },
                    ],
                },
                {
                    featureType: "road.local",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#616161",
                        },
                    ],
                },
                {
                    featureType: "transit",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#757575",
                        },
                    ],
                },
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#000000",
                        },
                    ],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#3d3d3d",
                        },
                    ],
                },
            ],
        },
        currentLocation: null,
        currentLocationIndex: null,
        loading: false,
        locations: [],
    }),
    methods: {
        ...mapActions("background", {
            setWhiteIcons: "setWhiteIcons",
        }),
        async fetchLocations() {
            try {
                this.loading = true;
                const { data } = await Get({
                    endpoint: "locations",
                    useToken: false,
                });
                this.locations = data;
                this.setInitialLocation();
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        setInitialLocation() {
            this.currentLocation = this.locations[0];
            this.currentLocationIndex = this.locations.findIndex(
                (x) => x.id === this.currentLocation.id,
            );
        },
        nextLocation(index) {
            const nextIndex = this.locations.length - 1 === index ? 0 : index + 1;
            this.transition(() => {
                this.currentLocation = this.locations[nextIndex];
                this.currentLocationIndex = nextIndex;
            });
        },
        prevLocation(index) {
            const prevIndex = index === 0 ? this.locations.length - 1 : index - 1;
            this.transition(() => {
                this.currentLocation = this.locations[prevIndex];
                this.currentLocationIndex = prevIndex;
            });
        },
        openGoogleMaps(link) {
            window.open(link, "_blank");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/vars";

@include transition-common(".maps__side", "white");
@include transition-common(".maps__render-map", "white");

.maps {
    height: 100vh;
    width: 100%;
    &-inner {
        height: 100%;
        display: flex;
        flex-direction: column-reverse;
        align-items: stretch;
        justify-content: center;
        .maps__side {
            background-color: black;
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
            height: 100%;
            flex-direction: column;
            .map__side-inner {
                padding: 0 15px;
                margin-bottom: 20px;
                h1 {
                    color: white;
                    font-size: 28px;
                    width: 70%;
                    margin: 0;
                }
                span {
                    color: white;
                }
                p {
                    margin-top: 15px;
                    color: white;
                }
                .maps-button {
                    // @include secondary-button-br($main-green, $main-green);
                    @include small-button("white", "black", "white");
                }
            }
            .map__side-controls {
                width: 100%;
                @include flex("row", "center", "space-between");
                button {
                    background-color: transparent;
                    border: none;
                    font-size: 16px;
                    padding: 5px 15px;
                    margin-bottom: 15px;
                }
                .controls--prev {
                    color: white;
                }
                .controls--next {
                    color: white;
                }
            }
        }
        .maps__render-map {
            flex: 2;
        }
        @media #{$break-medium} {
            flex-direction: row;
            .maps__side {
                background-color: black;
                flex: 1;
            }
            .maps__render-map {
                flex: 3;
            }
        }
    }
}
.map {
    width: 100%;
    height: 100%;
}
</style>
