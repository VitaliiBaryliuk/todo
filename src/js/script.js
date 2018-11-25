(function wind() {
  const input = document.querySelector('.todo__input');
  const taskContainer = document.querySelector('.todo__task-container');
  const bottom = document.querySelector('.todo__bottom');
  const counter = document.querySelector('.todo__counter');
  const allTab = document.querySelector('.todo__all-tasks');
  const activeTab = document.querySelector('.todo__active-tasks');
  const completedTab = document.querySelector('.todo__completed-tasks');
  const clearActiveButton = document.querySelector('.todo__clear-complated');
  const tabBattons = document.querySelectorAll('.tab-button');
  const tabsContainer = document.querySelector('.todo__tabs');
  let allTasks = null;
  let allExisting = null;
  let completedTasks = null;

  const setElement = (curentElem, parentElemm, classOne, classTwo) => {
    parentElemm.appendChild(curentElem);
    curentElem.classList.add(classOne, classTwo);
  };

  const showHideClearCompleted = () => {
    if (document.querySelectorAll('.checked').length > 0) {
      document.querySelector('.todo__clear-complated').classList.add('opacity')
    } else {
      document.querySelector('.todo__clear-complated').classList.remove('opacity');
    }
  };

  const setExistingCounter = () => {
    allExisting = document.querySelectorAll('.todo__task-item').length - document.querySelectorAll('.checked').length;
    counter.innerHTML = `${allExisting} items left`;
    showHideClearCompleted();
  };

  const createTaskEventListener = (event) => {
    if (event.keyCode === 13 && input.value !== '') {
      const task = document.createElement('li');
      setElement(task, taskContainer, 'todo__task-item');

      const taskLeftSide = document.createElement('div');
      setElement(taskLeftSide, task, 'flex-start');

      const checkLabel = document.createElement('label');
      setElement(checkLabel, taskLeftSide, 'todo__check-label', 'cursor');

      const check = document.createElement('input');
      setElement(check, checkLabel, 'hide');
      check.setAttribute('type', 'checkbox');

      const taskText = document.createElement('div');
      setElement(taskText, taskLeftSide, 'todo__task-text', 'flex-start');
      taskText.innerHTML = input.value;

      const removeItem = document.createElement('div');
      setElement(removeItem, task, 'todo__remove-item', 'cursor');

      checkLabel.addEventListener('click', () => {
        const tasksCount = document.querySelectorAll('.todo__task-item').length;
        const checkedTasksCount = document.querySelectorAll('.checked').length;
        if (check.checked) {
          checkLabel.classList.add('checked-image');
          task.classList.add('checked');
          allExisting = tasksCount - checkedTasksCount;
          setExistingCounter();
        } else {
          checkLabel.classList.remove('checked-image');
          task.classList.remove('checked');
          allExisting = tasksCount - checkedTasksCount;
          setExistingCounter();
        }
      });

      /* remove and add close element on every task */
      task.addEventListener('mouseover', () => {
        removeItem.classList.add('opacity');
      });
      task.addEventListener('mouseout', () => {
        removeItem.classList.remove('opacity');
      });

      removeItem.addEventListener('click', () => {
        removeItem.parentElement.remove();
        showHideClearCompleted();
        setExistingCounter();
      });

      input.value = '';
      bottom.classList.remove('hide');
      setExistingCounter();
    }
  };

  const setCurrentButton = (event) => {
    for (let i = 0; i < tabBattons.length; i += 1) {
      tabsContainer.classList.remove('current-button');
      tabBattons[i].classList.remove('current-button');
    }
    event.target.classList.add('current-button');
  };

  const showAll = () => {
    allTasks = document.querySelectorAll('.todo__task-item');
    for (let i = 0; i < allTasks.length; i += 1) {
      allTasks[i].classList.remove('hide');
    }
  };

  const showActive = () => {
    showAll();
    completedTasks = document.querySelectorAll('.checked');
    for (let i = 0; i < completedTasks.length; i += 1) {
      completedTasks[i].classList.add('hide');
    }
  };

  const showCompleted = () => {
    showAll();
    allTasks = document.querySelectorAll('.todo__task-item');
    for (let i = 0; i < allTasks.length; i += 1) {
      if (/checked/.test(allTasks[i].className) !== true) {
        allTasks[i].classList.add('hide');
      }
    }
  };

  const clearActive = () => {
    allTasks = document.querySelectorAll('.todo__task-item');
    for (let i = 0; i < allTasks.length; i += 1) {
      if (/checked/.test(allTasks[i].className) === true) {
        allTasks[i].remove();
      }
    }
  };

  const todoInit = () => {
    input.addEventListener('keyup', createTaskEventListener);
    allTab.addEventListener('click', showAll);
    activeTab.addEventListener('click', showActive);
    completedTab.addEventListener('click', showCompleted);
    clearActiveButton.addEventListener('click', clearActive);
    tabsContainer.addEventListener('click', (event) => {
      setCurrentButton(event);
    });
  };
  todoInit();
}());
