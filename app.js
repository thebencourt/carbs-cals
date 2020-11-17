function init() {
  const form = document.getElementById('form')
  const amount = document.getElementById('amount');
  const calories = document.getElementById('calories');
  const carbs = document.getElementById('carbs');
  const serving = document.getElementById('serving');
  const caloriesOutput = document.getElementById('calories-output');
  const carbsOutput = document.getElementById('carbs-output');

  function calculate(ev) {
    ev.preventDefault();

    if (!amount.value || (!calories.value && !carbs.value) || !serving.value) {
      return;
    }

    const amountVal = parseFloat(amount.value);
    const caloriesVal = parseFloat(calories.value) || 0;
    const carbsVal = parseFloat(carbs.value) || 0;
    const servingVal = parseFloat(serving.value);

    if (
      Number.isNaN(amountVal) ||
      Number.isNaN(caloriesVal) ||
      Number.isNaN(carbsVal) ||
      Number.isNaN(servingVal)
    ) {
      return;
    }

    const caloriesPerGram = caloriesVal / servingVal;
    const carbsPerGram = carbsVal / servingVal;
    const totalCals = caloriesPerGram * amountVal;
    const totalCarbs = carbsPerGram * amountVal;

    const fixedCalories = totalCals.toFixed(2);
    const fixedCarbs = totalCarbs.toFixed(2);

    caloriesOutput.textContent = fixedCalories.split('.')[1] === '00'
      ? fixedCalories.split('.')[0]
      : fixedCalories;

    carbsOutput.textContent = fixedCarbs.split('.')[1] === '00'
      ? fixedCarbs.split('.')[0]
      : fixedCarbs;
  }

  form.addEventListener('submit', calculate);
}

document.addEventListener('DOMContentLoaded', init);
