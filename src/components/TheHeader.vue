<template>
	<header class="header">
		<nav class="header__nav">
			<router-link class="header__link" to="/">Главная</router-link>
			<router-link class="header__link" to="/tasks">Списки</router-link>
			<router-link class="header__link" to="/favorite">Любимые</router-link>
		</nav>
	</header>
</template>

<style lang="scss">
	.header {
		background-color: #f0f0f0;
		padding: 10px;
		&__nav {
			display: flex;
			justify-content: center;
		}

		&__link {
			margin: 0 10px;
			text-decoration: none;
			color: #333;
			font-weight: bold;
		}
	}
</style>
