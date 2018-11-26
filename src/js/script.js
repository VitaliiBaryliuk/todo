(function wind() {
  const taskContainer = document.querySelector('.todo__task-container');
  const bottom = document.querySelector('.todo__bottom');
  const counter = document.querySelector('.todo__counter');
  const tabBattons = document.querySelectorAll('.tab-button');
  const input = document.querySelector('.todo__input');
  const inputArrow = document.querySelector('.todo__input-arrow');

  const CreateAndSetElement = (tag, parentElemm, classOne, classTwo) => {
    const elem = document.createElement(tag);
    parentElemm.appendChild(elem);
    elem.classList.add(classOne, classTwo);
    return elem;
  };

  const showHideClearCompleted = () => {
    if (document.querySelectorAll('.checked').length > 0) {
      document.querySelector('.todo__clear-complated').classList.add('opacity');
    } else {
      document.querySelector('.todo__clear-complated').classList.remove('opacity');
    }
  };

  const setExistingCounter = () => {
    const allExisting = document.querySelectorAll('.todo__task-item').length - document.querySelectorAll('.checked').length;
    counter.innerHTML = `${allExisting} items left`;
    showHideClearCompleted();
  };

  const showHideArrow = () => {
    if (document.querySelectorAll('.todo__task-item').length > 0) {
      inputArrow.classList.remove('hide');
    } else {
      inputArrow.classList.add('hide');
    }
  };

  const setArrowEventListener = () => {
    const allTasks = document.querySelectorAll('.todo__task-item');
    const checkedTasks = document.querySelectorAll('.checked');
    const checkLabel = document.querySelectorAll('.todo__check-label');
    if (allTasks.length - checkedTasks.length !== 0) {
      for (let i = 0; i < allTasks.length; i += 1) {
        allTasks[i].classList.add('checked');
        checkLabel[i].classList.add('checked-image');
        setExistingCounter();
      }
    } else {
      for (let i = 0; i < allTasks.length; i += 1) {
        allTasks[i].classList.remove('checked');
        checkLabel[i].classList.remove('checked-image');
        setExistingCounter();
      }
    }
  };

  const createTaskEventListener = (event) => {
    if (event.keyCode === 13 && input.value !== '') {
      const task = CreateAndSetElement('li', taskContainer, 'todo__task-item');

      const taskLeftSide = CreateAndSetElement('div', task, 'flex-start');

      const checkLabel = CreateAndSetElement('label', taskLeftSide, 'todo__check-label', 'cursor');

      const check = CreateAndSetElement('input', checkLabel, 'hide');
      check.setAttribute('type', 'checkbox');

      const taskText = CreateAndSetElement('div', taskLeftSide, 'todo__task-text', 'flex-start');
      taskText.innerHTML = input.value;

      const removeItem = CreateAndSetElement('div', task, 'todo__remove-item', 'cursor');

      input.value = '';
      bottom.classList.remove('hide');
      setExistingCounter();
      showHideArrow();

      checkLabel.addEventListener('click', () => {
        if (check.checked) {
          checkLabel.classList.add('checked-image');
          task.classList.add('checked');
          setExistingCounter();
        } else {
          checkLabel.classList.remove('checked-image');
          task.classList.remove('checked');
          setExistingCounter();
        }
      });

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
        showHideArrow();
      });
    }
  };

  const setCurrentButton = (event) => {
    for (let i = 0; i < tabBattons.length; i += 1) {
      tabBattons[i].classList.remove('current-button');
    }
    event.target.classList.add('current-button');
  };

  const showAll = () => {
    const allTasks = document.querySelectorAll('.todo__task-item');
    for (let i = 0; i < allTasks.length; i += 1) {
      allTasks[i].classList.remove('hide');
    }
  };

  const showActive = () => {
    showAll();
    const completedTasks = document.querySelectorAll('.checked');
    for (let i = 0; i < completedTasks.length; i += 1) {
      completedTasks[i].classList.add('hide');
    }
  };

  const showCompleted = () => {
    showAll();
    const allTasks = document.querySelectorAll('.todo__task-item');
    for (let i = 0; i < allTasks.length; i += 1) {
      if (/checked/.test(allTasks[i].className) !== true) {
        allTasks[i].classList.add('hide');
      }
    }
  };

  const clearActive = () => {
    const allTasks = document.querySelectorAll('.todo__task-item');
    for (let i = 0; i < allTasks.length; i += 1) {
      if (/checked/.test(allTasks[i].className) === true) {
        allTasks[i].remove();
      }
    }
  };

  const allTab = document.querySelector('.todo__all-tasks');
  const activeTab = document.querySelector('.todo__active-tasks');
  const completedTab = document.querySelector('.todo__completed-tasks');
  const clearActiveButton = document.querySelector('.todo__clear-complated');
  const tabsContainer = document.querySelector('.todo__tabs');

  const todoInit = () => {
    input.addEventListener('keyup', createTaskEventListener);
    allTab.addEventListener('click', showAll);
    activeTab.addEventListener('click', showActive);
    completedTab.addEventListener('click', showCompleted);
    clearActiveButton.addEventListener('click', clearActive);
    tabsContainer.addEventListener('click', setCurrentButton);
    inputArrow.addEventListener('click', setArrowEventListener);
  };
  todoInit();
}());
