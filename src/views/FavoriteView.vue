<template>
	<div>
		<div v-if="FAVORITE.length">
			<transition-group name="list" tag="ul" class="list">
				<li class="list__item" v-for="(task, index) in FAVORITE" :key="index">
					<p>{{ task.text }}</p>
					<div style="cursor: pointer" @click="removeFavorite(task.id)">
						Удалить из избранное⭐
					</div>
				</li>
			</transition-group>
		</div>
		<div v-else>Пока нет любимых записей</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		computed: {
			...mapGetters(['FAVORITE']),
		},
		methods: {
			...mapActions(['removeFavorite']),
		},
	};
</script>
