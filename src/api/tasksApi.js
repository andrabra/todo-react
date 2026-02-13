const URL = 'http://localhost:3001/tasks';
const headers = { 'Content-Type': 'application/json' };

const tasksApi = {
  toJson: (data) => data.json(),

  getAll: () => fetch(URL).then(tasksApi.toJson),

  add: async (newTask) => {
    return fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(newTask),
    }).then(tasksApi.toJson);
  },

  delete: (taskId) =>
    fetch(`${URL}/${taskId}`, {
      method: 'DELETE',
    }),

  deleteAll: (tasks) => Promise.all(tasks.map(({ id }) => tasksApi.delete(id))),

  toggleComplete: (taskId, isDone) =>
    fetch(`${URL}/${taskId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ isDone }),
    }).then(tasksApi.toJson),
};

export default tasksApi;
