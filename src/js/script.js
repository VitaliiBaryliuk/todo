(function wind() {
  const input = document.querySelector('.todo__input');
  const taskContainer = document.querySelector('.todo__task-container');
  const bottom = document.querySelector('.todo__bottom');
  const counter = document.querySelector('.todo__counter');
  const allTab = document.querySelector('.todo__all-tasks');
  const activeTab = document.querySelector('.todo__active-tasks');
  const completedTab = document.querySelector('.todo__completed-tasks');
  const clearActiveButton = document.querySelector('.todo__clear-complated');
  const tabBattons = document.querySelectorAll('.tab-button');0
  const tabsContainer = document.querySelector('.todo__tabs');
  let allTasks = null;
  let allExisting = null;
  let completedTasks = null;

  function setElements(parentElemm, curentElem) {
    parentElemm.appendChild(curentElem);
    curentElem.classList.add('todo__task-text', 'flex-start');
    curentElem.innerHTML = input.value;
  }

  /*   */
  // function setChecked(labelElem, checkElem, taskElem) {
  //   console.log('OK');
  //   if (checkElem.checked) {
  //     labelElem.classList.add('checked-image');
  //     taskElem.classList.add('checked');
  //     allExisting = document.querySelectorAll('.todo__task-item').length - document.querySelectorAll('.checked').length;
  //     counter.innerHTML = `${allExisting} items left`;
  //   } else {
  //     labelElem.classList.remove('checked-image');
  //     taskElem.classList.remove('checked');
  //     allExisting = document.querySelectorAll('.todo__task-item').length - document.querySelectorAll('.checked').length;
  //     counter.innerHTML = `${allExisting} items left`;
  //   }
  //   return counter;
  // }

  const setExisting = () => {
    allExisting = document.querySelectorAll('.todo__task-item').length - document.querySelectorAll('.checked').length;;
    counter.innerHTML = `${allExisting} items left`;
  };

  const createTaskEventListener = (event) => {
    if (event.keyCode === 13 && input.value !== '') {

      const task = document.createElement('li');
      taskContainer.appendChild(task);
      task.classList.add('todo__task-item');

      const taskLeftSide = document.createElement('div');
      task.appendChild(taskLeftSide);
      taskLeftSide.classList.add('flex-start');

      const checkLabel = document.createElement('label');
      taskLeftSide.appendChild(checkLabel);
      checkLabel.classList.add('todo__check-label', 'cursor');

      const check = document.createElement('input');
      check.setAttribute('type', 'checkbox');
      check.classList.add('hide');
      checkLabel.appendChild(check);


//      checkLabel.addEventListener('click', setChecked(checkLabel, check, task));
      checkLabel.addEventListener('click', () => {
        if (check.checked) {

          checkLabel.classList.add('checked-image');
          task.classList.add('checked');
          //console.log(document.querySelector('.todo__clear-complated'));
          allExisting = document.querySelectorAll('.todo__task-item').length - document.querySelectorAll('.checked').length;
          counter.innerHTML = `${allExisting} items left`;
          document.querySelectorAll('.checked').length > 0 ? document.querySelector('.todo__clear-complated').classList.add('opacity'): document.querySelector('.todo__clear-complated').classList.remove('opacity'); 
          // setExisting();

        } else {
          checkLabel.classList.remove('checked-image');
          task.classList.remove('checked');
          //console.log(document.querySelector('.todo__clear-complated'));
          allExisting = document.querySelectorAll('.todo__task-item').length - document.querySelectorAll('.checked').length;
          counter.innerHTML = `${allExisting} items left`;

          document.querySelectorAll('.checked').length > 0 ? document.querySelector('.todo__clear-complated').classList.add('opacity'): document.querySelector('.todo__clear-complated').classList.remove('opacity'); 
          // setExisting();
        }
        //return counter;
      });


      const taskText = document.createElement('div');
      setElements(taskLeftSide, taskText);

      const removeItem = document.createElement('div');
      task.appendChild(removeItem);
      removeItem.classList.add('todo__remove-item', 'cursor');


      /* remove and add close element on every task */
      task.addEventListener('mouseover', () => {
        removeItem.classList.add('opacity');
      });
      task.addEventListener('mouseout', () => {
        removeItem.classList.remove('opacity');
      });


      // const removeItem = document.createElement('div');
      // task.appendChild(removeItem);
      // removeItem.classList.add('todo__remove-item');
      // removeItem.innerHTML = '&#88;';


      removeItem.addEventListener('click', () => {
        removeItem.parentElement.remove();
        document.querySelectorAll('.checked').length > 0 ? document.querySelector('.todo__clear-complated').classList.add('opacity') : document.querySelector('.todo__clear-complated').classList.remove('opacity');
        setExisting();
      });


      input.value = '';
      bottom.classList.remove('hide');
      setExisting();
      // counter.innerHTML = `${allExisting} items left`;
    }
  };

  const setCurrentButton = (event) => {
    for (let i = 0; i < tabBattons.length; i += 1) {
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

  const createTask = () => {
    input.addEventListener('keyup', createTaskEventListener);
  };

  const todoInit = () => {
    createTask();
    allTab.addEventListener('click', showAll);
    activeTab.addEventListener('click', showActive);
    completedTab.addEventListener('click', showCompleted);
    clearActiveButton.addEventListener('click', clearActive);
    tabsContainer.addEventListener('click', function(event) {
      setCurrentButton(event);
    });
  };
  todoInit();
  //todo.addEventListener('change', todoInit);
}());
