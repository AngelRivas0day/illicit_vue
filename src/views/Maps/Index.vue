<template>
    <div class="maps">
        <div class="maps-inner">
            <div class="maps__side">
                <div class="map__side-inner">
                    <label>
                        <gmap-autocomplete
                        @place_changed="setPlace">
                        </gmap-autocomplete>
                        <button @click="addMarker">Add</button>
                    </label>
                    <h1>test</h1>
                    <span
                        >Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Possimus.</span
                    >
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Tenetur, delectus.
                    </p>
                </div>
                <div class="map__side-controls">
                    <button class="controls--prev">anterior</button>
                    <button class="controls--next">siguiente</button>
                </div>
            </div>
            <div class="maps__render-map">
                <gmap-map
                    class="map"
                    :center="center"
                    :zoom="12"
                    :options="mapStyle"
                >
                    <gmap-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :="m.position"
                        @click="center = m.position"
                    ></gmap-marker>
                </gmap-map>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store'

export default {
    name: "Maps",
    mounted() {
        store.dispatch('background/setWhiteIcons', null, { root: true });
        this.geolocate();
        this.addMarker();
    },
    destroyed(){
        store.dispatch('background/unsetWhiteIcons', null, { root: true });
    },
    data: () => ({
        center: { lat: 45.508, lng: -73.587 },
        markers: [],
        places: [],
        currentPlace: null,
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
    }),
    methods: {
        // receives a place object via the autocomplete component
        setPlace(place) {
            this.currentPlace = place;
            console.log("Place: ", place);
        },
        addMarker() {
            if (this.currentPlace) {
                const marker = {
                    lat: this.currentPlace.geometry.location.lat(),
                    lng: this.currentPlace.geometry.location.lng(),
                };
                this.markers.push({ position: marker });
                this.places.push(this.currentPlace);
                this.center = marker;
                this.currentPlace = null;
            }
        },
        geolocate: function() {
            navigator.geolocation.getCurrentPosition((position) => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/vars";

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
