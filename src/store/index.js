import Vue from 'vue';
import Vuex from 'vuex';
import { useLocalStorage } from '@vueuse/core';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tasks: useLocalStorage('tasks', []),
		favorite: useLocalStorage('favorite', []),
	},
	getters: {
		TASKS(state) {
			return state.tasks;
		},
		FAVORITE(state) {
			return state.favorite;
		},
	},
	mutations: {
		addTask(state, task) {
			state.tasks.push(task);
		},
		updateTask(state, { index, updatedTask }) {
			state.tasks.splice(index, 1, updatedTask);
		},
		deleteTask(state, id) {
			state.tasks = state.tasks.filter(i => {
				return i.id !== id;
			});
		},
		addFavorite(state, item) {
			let contain = false;
			state.favorite.forEach(i => {
				if (i.id === item.id) {
					contain = true;
					return;
				}
			});
			if (!contain) {
				state.favorite.push(item);
			}
		},
		removeFavorite(state, id) {
			state.favorite = state.favorite.filter(i => {
				return i.id !== id;
			});
		},
	},
	actions: {
		addTask({ commit }, task) {
			commit('addTask', task);
		},
		updateTask({ commit }, { index, updatedTask }) {
			commit('updateTask', { index, updatedTask });
		},
		deleteTask({ commit }, id) {
			commit('deleteTask', id);
		},
		addFavorite({ commit }, item) {
			commit('addFavorite', item);
		},
		removeFavorite({ commit }, id) {
			commit('removeFavorite', id);
		},
	},
});
