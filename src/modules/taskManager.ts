const tasks = [
  { id: 1, title: 'Find purpose' },
  { id: 2, title: 'Build the world' },
  { id: 3, title: 'Rest with honor' }
];

export const taskManager = (() => {
  function getTasks() {
    return tasks;
  }

  return {
    getTasks
  };
})();
