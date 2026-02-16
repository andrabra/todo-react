const URL = 'http://localhost:3001/tasks';
const headers = { 'Content-Type': 'application/json' };

const serverApi = {
  toJson: (data) => data.json(),

  getAll: () => fetch(URL).then(serverApi.toJson),

  add: async (newTask) => {
    return fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(newTask),
    }).then(serverApi.toJson);
  },

  delete: (taskId) =>
    fetch(`${URL}/${taskId}`, {
      method: 'DELETE',
    }),

  deleteAll: (tasks) => Promise.all(tasks.map(({ id }) => serverApi.delete(id))),

  toggleComplete: (taskId, isDone) =>
    fetch(`${URL}/${taskId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ isDone }),
    }).then(serverApi.toJson),

  getById: (taskId) => fetch(`${URL}/${taskId}`).then(serverApi.toJson),
};

export default serverApi;
