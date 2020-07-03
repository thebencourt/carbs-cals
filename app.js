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

    if (!amount.value || (!calories.value || !carbs.value) || !serving.value) {
      return;
    }

    const a = parseFloat(amount.value);
    const cal = parseFloat(calories.value);
    const car = parseFloat(carbs.value);
    const s = parseFloat(serving.value);

    if (Number.isNaN(a) || Number.isNaN(cal) || Number.isNaN(car) || Number.isNaN(s)) {
      return;
    }

    const caloriesPerGram = cal / s;
    const carbsPerGram = car / s;
    const totalCals = caloriesPerGram * a;
    const totalCarbs = carbsPerGram * a;

    caloriesOutput.textContent = totalCals;
    carbsOutput.textContent = totalCarbs;
  }

  form.addEventListener('submit', calculate);
}

document.addEventListener('DOMContentLoaded', init);
