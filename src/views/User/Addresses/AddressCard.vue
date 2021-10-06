<template>
	<div>
		<md-dialog :md-active.sync="showDialog">
			<md-dialog-title>¿Deseas borrar esta direcci&oacute;n de forma permanente?</md-dialog-title>
			<md-dialog-actions>
				<md-button @click="onCancel" class="md-dense md-basic md-stroked">Cancelar</md-button>
				<md-button @click="onAccept" class="md-accent md-dense md-raised">Eliminar</md-button>
			</md-dialog-actions>
		</md-dialog>
		<md-card>
			<md-card-header>
				<md-card-header-text>
					<div class="md-title">
						Direcci&oacute;n #{{ index + 1 }}
						<small style="font-size: 10px" v-if="address.isDefault">(DEFAULT)</small>
					</div>
					<div class="md-subhead">{{ address.city }}</div>
				</md-card-header-text>
			</md-card-header>
			<md-card-content> </md-card-content>
			<md-card-actions>
				<md-button v-if="!readOnly" @click="onDelete(address.id)" class="md-dense md-stroked md-accent">Borrar</md-button>
				<md-button v-if="readOnly" @click="selectAddress(address.id)" class="md-dense md-primary text-white md-raised">Seleccionar</md-button>
			</md-card-actions>
		</md-card>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'AddressCard',
	props: {
		address: {
			type: Object,
			required: true,
		},
		index: {
			type: Number,
			required: false,
		},
		readOnly: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		showDialog: false,
		addressId: null,
	}),
	methods: {
		...mapActions('addresses', {
			deleteAddress: 'deleteAddress',
		}),
		selectAddress(addressId) {
			this.$emit('selected', addressId)
		},
		onDelete(id) {
			this.addressId = id
			this.showDialog = true
		},
		onCancel() {
			this.addressId = null
			this.showDialog = false
		},
		onAccept() {
			this.deleteAddress(this.addressId)
		},
	},
}
</script>

<style></style>
