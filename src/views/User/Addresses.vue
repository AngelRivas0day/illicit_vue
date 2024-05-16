<template>
	<div>
		<address-form-dialog
			:active.sync="showAddressDialog"
			:addressId="dialogAddressId"
			@afterClosed="onAddressDialogClose"
		></address-form-dialog>
		<md-dialog-confirm
			:md-active.sync="showDeleteDialog"
			md-title="Confirmar eliminación"
			md-content="¿Estás seguro de que quieres eliminar esta dirección? Esta acción no se puede deshacer."
			md-confirm-text="Eliminar"
			md-cancel-text="Cancelar"
			@md-cancel="onCancelDelete"
			@md-confirm="onConfirmDelete"
		/>
		<md-card class="my-4">
			<md-card-header>
				<div class="md-title">Direcciones de env&iacute;o</div>
			</md-card-header>
			<md-card-content>
				<template v-if="addresses.length === 0">
					<md-empty-state
						md-icon="local_shipping"
						md-label="No tienes ninguna dirección registrada."
						md-description="Al crear una o varias direcciones de envío, podrás hacer tus pedidos de forma mas rápida."
					></md-empty-state>
				</template>
				<template v-else>
					<md-table v-model="addresses" md-sort="state" md-sort-order="asc">
						<md-table-row slot="md-table-row" slot-scope="{ item }">
							<md-table-cell md-label="Calle" md-sort-by="street">
								{{ item.street }}
							</md-table-cell>
							<md-table-cell md-label="Estado" md-sort-by="state">
								{{ item.state }}
							</md-table-cell>
							<md-table-cell md-label="Ciudad" md-sort-by="city">
								{{ item.city }}
							</md-table-cell>
							<md-table-cell md-label="# Ext." md-sort-by="extNumber">
								{{ item.extNumber }}
							</md-table-cell>
							<md-table-cell md-label="# Int." md-sort-by="intNumber">
								{{ item.intNumber }}
							</md-table-cell>
							<md-table-cell md-label="C.P." md-sort-by="zip">
								{{ item.zip}}
							</md-table-cell>
							<md-table-cell style="max-width: 70px;">
								<md-menu md-direction="bottom-end">
									<md-button class="md-icon-button md-ripple-off" md-menu-trigger>
										<md-icon>more_vert</md-icon>
									</md-button>
									<md-menu-content>
										<md-menu-item @click="onAddressDialogOpen(item.id)">
											Editar
										</md-menu-item>
										<md-menu-item @click="onAttemptDelete(item.id)">
											Eliminar
										</md-menu-item>
									</md-menu-content>
								</md-menu>
							</md-table-cell>
						</md-table-row>
					</md-table>
				</template>
			</md-card-content>
			<md-card-actions>
				<md-button
					:disabled="loading"
					class="md-raised md-primary md-dense"
					@click="onAddressDialogOpen()"
				>
					A&ntilde;adir direcci&oacute;n
				</md-button>
			</md-card-actions>
		</md-card>
	</div>
</template>


<script>
import {Delete, Get} from "@/api/api";
import AddressFormDialog from "@/views/User/AddressFormDialog.vue";

export default {
	name: "Addresses",
	components: {AddressFormDialog},
	async mounted() {
		await this.fetchData();
	},
	data: () => ({
		loading: false,
		addresses: [],
		showAddressDialog: false,
		dialogAddressId: null,
		showDeleteDialog: false,
		addressIdToDelete: null,
	}),
	methods: {
		/**
		 * @description
		 * The `fetchData` method will fetch only the addresses of the user.
		 * It is called when the user adds, updates or deletes an address.
		 * @return {Promise<void>}
		 */
		async fetchData() {
			try {
				this.loading = true;
				let { data: addresses } = await Get({
					endpoint: 'clients/addresses',
					useToken: true,
				});
				this.addresses = addresses;
				this.loading = false;
			} catch (error) {
				console.log({
					error,
				})
				this.loading = false;
			}
		},
		/**
		 * @description
		 * The `onAddressDialogOpen` method is responsible for opening the address dialog.
		 * It is called when the user clicks on the "Añadir dirección" button.
		 * It will also receive an Address ID if the user wants to update an address.
		 * @param {string|null} addressId
		 */
		async onAddressDialogOpen(addressId = null) {
			this.showAddressDialog = true;
			if (!addressId) return;
			this.dialogAddressId = addressId;
		},
		/**
		 * @description
		 * The `onAddressDialogClose` method is responsible for resetting the data of
		 * the address dialog when it is closed.
		 * It is called when the user closes manually or submits the address dialog.
		 * @param {boolean} updated - Whether the address was updated or not.
		 * @return {Promise<void>}
		 */
		onAddressDialogClose(updated) {
			this.dialogAddressId = null;
			if (updated)
				this.fetchData();
		},
		/**
		 * @description
		 * The `onCancelDelete` method is responsible for hiding the delete dialog.
		 * It is called when the user clicks on the "Cancelar" button.
		 * @return {void}
		 */
		onCancelDelete() {
			this.showDeleteDialog = false;
			this.addressIdToDelete = null;
		},
		/**
		 * @description
		 * The `onConfirmDelete` method is responsible for deleting the address.
		 * It is called when the user clicks on the "Eliminar" button.
		 * @return {Promise<void>}
		 */
		async onConfirmDelete() {
			try {
				this.loading = true;
				await Delete({
					endpoint: `clients/addresses/${this.addressIdToDelete}`,
					useToken: true,
				});
				this.addressIdToDelete = null;
				this.showDeleteDialog = false;
				this.loading = false;
				await this.fetchData();
			} catch (error) {
				this.$notify({
					group: "user",
					title: "Ha ocurrido un error.",
					text: "La dirección no se ha podido eliminar. Por favor, intenta de nuevo.",
					type: "warn",
				});
				this.loading = false;
			}
		},
		/**
		 * @description
		 * The `onAttemptDelete` method is responsible for showing the delete dialog.
		 * It is called when the user clicks on the "Eliminar" button of an address row.
		 * @param {string} addressId
		 */
		onAttemptDelete(addressId) {
			this.addressIdToDelete = addressId;
			this.showDeleteDialog = true;
		},
	}
}
</script>

<style scoped lang="scss">

</style>
