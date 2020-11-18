function init() {
  // Form/buttons
  const form = document.getElementById('form');
  const calculateBtn = document.getElementById('calculate');
  const saveBtn = document.getElementById('save');
  const saveEntryBtn = document.getElementById('saveEntry');
  const listBtn = document.getElementById('listBtn');

  // Inputs
  const numberInputs = document.querySelectorAll('input[type="number"]');
  const amount = document.getElementById('amount');
  const calories = document.getElementById('calories');
  const carbs = document.getElementById('carbs');
  const serving = document.getElementById('serving');
  const name = document.getElementById('name');

  // Outputs
  const caloriesOutput = document.getElementById('calories-output');
  const carbsOutput = document.getElementById('carbs-output');

  // Modal
  const modal = document.getElementById('modal');

  // Sidebar
  const sidebar = document.getElementById('sidebar');


  /**
   * calculate
   * @param {ev} Event
   * Basic validation and calculate values
   */
  function calculate(ev) {
    ev.preventDefault();

    // Check we have required values
    if (!amount.value || (!calories.value && !carbs.value) || !serving.value) {
      // @TODO: Add validation about missing fields
      return;
    }

    // Get values, default any optional ones to 0
    const amountVal = parseFloat(amount.value);
    const caloriesVal = parseFloat(calories.value) || 0;
    const carbsVal = parseFloat(carbs.value) || 0;
    const servingVal = parseFloat(serving.value);

    // Check values entered are valid
    if (
      Number.isNaN(amountVal) ||
      Number.isNaN(caloriesVal) ||
      Number.isNaN(carbsVal) ||
      Number.isNaN(servingVal)
    ) {
      return;
    }

    // Do the math!
    const caloriesPerGram = caloriesVal / servingVal;
    const carbsPerGram = carbsVal / servingVal;
    const totalCals = caloriesPerGram * amountVal;
    const totalCarbs = carbsPerGram * amountVal;

    // Round to two decimals
    const fixedCalories = totalCals.toFixed(2);
    const fixedCarbs = totalCarbs.toFixed(2);

    // If decimcals are 00 then remove
    caloriesOutput.textContent = fixedCalories.split('.')[1] === '00'
      ? fixedCalories.split('.')[0]
      : fixedCalories;

    carbsOutput.textContent = fixedCarbs.split('.')[1] === '00'
      ? fixedCarbs.split('.')[0]
      : fixedCarbs;

    // Toggle the buttons
    calculateBtn.setAttribute('hidden', '');
    saveBtn.removeAttribute('hidden');
    saveBtn.focus();
  }


  /**
   * openModal
   * Opens the save entry modal
   */
  function openModal() {
    modal.classList.add('modal--active');
    requestAnimationFrame(() => name.focus());
  }


  /**
   * save
   * Saves the entry to localStorage
   */
  function save() {
    const data = {
      name: name.value.trim(),
      amount: amount.value,
      calories: caloriesOutput.textContent,
      carbs: carbsOutput.textContent,
    };

    const savedItems = localStorage.getItem('saved');
    const parsed = savedItems ? JSON.parse(savedItems) : [];
    const updated = [
      ...parsed,
      data,
    ];

    localStorage.setItem('saved', JSON.stringify(updated));

    amount.value = '';
    calories.value = '';
    carbs.value = '';
    serving.value = '';

    caloriesOutput.textContent = '0';
    carbsOutput.textContent = '0';

    toggleButtons();
  }


  /**
   * toggleButtons
   */
  function toggleButtons() {
    if (calculateBtn.hasAttribute('hidden')) {
      saveBtn.setAttribute('hidden', '');
      calculateBtn.removeAttribute('hidden');
    }

    if (modal.classList.contains('modal--active')) {
      modal.classList.remove('modal--active');
    }
  }


  /**
   * toggleList
   */
  function toggleList() {
    sidebar.classList.toggle('Sidebar--active');
  }


  /**
   * setupList
   */
  function setupList() {
    const list = document.getElementById('savedList');
    const items = localStorage.getItem('saved');
    const parsed = JSON.parse(items);
    const frag = document.createDocumentFragment();
    
    parsed.forEach(p => {
      const li = document.createElement('li');
      li.className = 'Sidebar__listItem';
      li.innerHTML = `
        <h3>${p.name}</h3>
        <span>
          <strong>Amount:</strong> ${p.amount}
        </span>
        <br />
        <span>
          <strong>Calories:</strong> ${p.calories}
        </span>
        <br />
        <span>
          <strong>Carbs:</strong> ${p.carbs}
        </span>
      `;
      frag.appendChild(li);
    });

    list.appendChild(frag);
  }


  if (localStorage.getItem('saved')) {
    listBtn.removeAttribute('hidden');
    
    setupList();
  }


  // Add event listeners
  listBtn.addEventListener('click', toggleList);
  form.addEventListener('submit', calculate);
  saveBtn.addEventListener('click', openModal);
  saveEntryBtn.addEventListener('click', save);
  numberInputs.forEach(i => i.addEventListener('input', toggleButtons));
}


// GO!
document.addEventListener('DOMContentLoaded', init);
