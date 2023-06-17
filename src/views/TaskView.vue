<template>
	<div>
		<h1>Список задач</h1>
		<form @submit.prevent="createTask" class="create-form">
			<div class="input-container">
				<input type="text" id="input" required="" v-model="taskText" />
				<label for="input" class="label">Введите текст задачи</label>
				<div class="underline"></div>
			</div>

			<button type="submit">Создать задачу</button>
		</form>
		<transition-group name="list" tag="ul" class="list">
			<li class="list__item" v-for="(task, index) in TASKS" :key="task.id">
				<p>
					<span>{{ task.complete ? '🟢' : '🟡' }}</span> {{ task.text }}
				</p>
				<div
					v-if="FAVORITE[index]?.id !== task.id"
					style="cursor: pointer"
					@click="toggleFavorite(task)"
				>
					Добавить в избранное⭐
				</div>
				<button @click="task.complete = !task.complete">
					{{ task.complete ? 'Еще нет' : 'Сделано' }}
				</button>
				<button @click="editTask(index)">Редактировать</button>
				<button @click="removeTask(task.id)">Удалить</button>
			</li>
		</transition-group>

		<div v-if="editingTask !== null">
			<h2>Редактирование задачи</h2>
			<form @submit.prevent="saveEditedTask">
				<input v-model="editedTaskText" type="text" required />
				<button type="submit">Сохранить</button>
				<button @click="cancelEditTask">Отмена</button>
			</form>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		data() {
			return {
				taskText: '',
				editedTaskText: '',
				editingTask: null,
			};
		},
		computed: {
			...mapGetters(['TASKS', 'FAVORITE']),
		},
		methods: {
			...mapActions(['addTask', 'updateTask', 'deleteTask', 'addFavorite']),
			createTask() {
				const uuid = Math.random() * 10;
				if (this.taskText) {
					this.addTask({ id: uuid, text: this.taskText, complete: false });
					this.taskText = '';
				}
			},
			saveEditedTask() {
				if (this.editingTask !== null) {
					const updatedTask = {
						...this.TASKS[this.editingTask],
						text: this.editedTaskText,
					};
					this.updateTask({ index: this.editingTask, updatedTask });
					this.cancelEditTask();
				}
			},
			editTask(index) {
				this.editingTask = index;
				this.editedTaskText = this.TASKS[index].text;
			},
			cancelEditTask() {
				this.editingTask = null;
				this.editedTaskText = '';
			},
			removeTask(id) {
				this.deleteTask(id);
				if (this.editingTask === id) {
					cancelEditTask();
				}
			},
			toggleFavorite(task) {
				this.addFavorite(task);
			},
		},
	};
</script>

<style lang="scss">
	.create-form {
		margin-bottom: 25px;
	}
	.input-container {
		position: relative;
		margin: 35px auto 10px;
		width: 200px;
	}

	.input-container input[type='text'] {
		font-size: 20px;
		width: 100%;
		border: none;
		border-bottom: 2px solid #ccc;
		padding: 5px 0;
		background-color: transparent;
		outline: none;
	}

	.input-container .label {
		position: absolute;
		top: 0;
		left: 0;
		color: #ccc;
		transition: all 0.3s ease;
		pointer-events: none;
	}

	.input-container input[type='text']:focus ~ .label,
	.input-container input[type='text']:valid ~ .label {
		top: -20px;
		font-size: 16px;
		color: #333;
	}

	.input-container .underline {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 2px;
		width: 100%;
		background-color: #333;
		transform: scaleX(0);
		transition: all 0.3s ease;
	}

	.input-container input[type='text']:focus ~ .underline,
	.input-container input[type='text']:valid ~ .underline {
		transform: scaleX(1);
	}
</style>
