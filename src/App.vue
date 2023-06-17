<template>
	<div id="app">
		<TheHeader />
		<router-view />
	</div>
</template>

<script setup>
	import TheHeader from '@/components/TheHeader.vue';
</script>

<style lang="scss">
*, *::before, *::after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		&__item {
			align-items: center;
			gap: 20px;
			justify-content: space-between;
			background-color: #ecf7f0;
			list-style: none;
			display: flex;
			box-shadow: 5px 15px 15px rgba(65, 65, 65, 0.247);
			padding: 15px 10px;
			border-radius: 8px;

			& p {
				flex: 1;
				text-align: left;
			}
		}
	}

	.list-item {
		display: inline-block;
		margin-right: 10px;
	}
	.list-enter-active,
	.list-leave-active {
		transition: all 1s;
	}
	.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
		opacity: 0;
		transform: translateX(30px);
	}
	button {
		padding: 10px 20px;
		background-color: transparent;
		border: 1px solid black;
		cursor: pointer;
	}
</style>
