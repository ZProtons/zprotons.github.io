// Define the form steps
const formSteps = document.querySelectorAll('.form-step');
let currentStep = 0;

// Define the form elements
const form = document.getElementById('order-form');
const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.prev-button');

// Show the current step and hide the others
function showStep(stepIndex) {
  formSteps.forEach((step, index) => {
    step.classList.add('hidden');
    if (index === stepIndex) {
      step.classList.remove('hidden');
    }
  });
}

// Show the next step
function showNextStep() {
  const currentFormStep = formSteps[currentStep];
  const nextFormStep = formSteps[currentStep + 1];

  if (currentFormStep.checkValidity()) {
    currentFormStep.classList.add('hidden');

    if (nextFormStep) {
      nextFormStep.classList.remove('hidden');
      currentStep++;
    }
  } else {
    currentFormStep.reportValidity();
  }
}

// Show the previous step
function showPrevStep() {
  const currentFormStep = formSteps[currentStep];
  const prevFormStep = formSteps[currentStep - 1];

  currentFormStep.classList.add('hidden');
  prevFormStep.classList.remove('hidden');
  currentStep--;
}

// Attach event listeners to the buttons
prevButtons.forEach(button => {
  button.addEventListener('click', showPrevStep);
});

nextButtons.forEach(button => {
  button.addEventListener('click', showNextStep);
});

// Handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const currentFormStep = formSteps[currentStep];
  if (currentFormStep.checkValidity()) {
    const successMessage = document.getElementById('success-message');
    successMessage.classList.remove('hidden');
  } else {
    currentFormStep.reportValidity();
  }
});
