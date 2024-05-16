<script>
export default {
	name: "SidebarOptions",
	props: {
		options: {
			type: Array,
			required: true,
			default: () => [],
		},
	},
	methods: {
		handleOptionSelected(option) {
			if (!option.routeData) return;
			this.$router.push(option.routeData);
			this.$emit("optionSelected", option);
		}
	},
}
</script>

<template>
	<md-list class="sidenav__md-list">
		<md-list-item
			v-for="item in options"
			:key="item.id"
			@click="handleOptionSelected(item)"
			:md-expand="item.children && item.children.length > 0"
			:class="{'has-children': item.children && item.children.length > 0}"
		>
			{{ item.label.toUpperCase() }}
			<md-list slot="md-expand" v-if="item.children.length > 0">
				<md-list-item
					v-for="child in item.children"
					:key="child.id"
					@click="handleOptionSelected(child)"
				>
					{{ child.label.toUpperCase() }}
				</md-list-item>
			</md-list>
		</md-list-item>
	</md-list>
</template>

<style scoped lang="scss">
.sidenav__md-list {
	::v-deep button {
		background-color: unset !important;
	}
	::v-deep div.md-list-item-content {
		background-color: unset !important;
		justify-content: flex-end;
		font-size: 18px !important;
	}
	::v-deep li.md-list-item.has-children div.md-list-item-content {
		flex-direction: row-reverse;
		justify-content: space-between;
		.md-icon {
			margin-left: 0 !important;
		}
	}
}
</style>
