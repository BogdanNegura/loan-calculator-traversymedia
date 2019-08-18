//  Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide results
     document.getElementById('results').style.display = 'none';
     
    //  Show loader
     document.getElementById('loading').style.display = 'block';

     setTimeout(countingResults , 2000);

    e.preventDefault();
});

// Counting Results
function countingResults(e){
    console.log('Counting...');

    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculateInterest = parseFloat(interest.value) / 100 / 12;
    const calculatePayments = parseFloat(years.value) * 12;

    // calculate montly payment
    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (principal*x*calculateInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayments).toFixed(2);
        totalInterest.value = ((monthly * calculatePayments)-principal).toFixed(2);

        // Show results
        document.getElementById('results').style.display = 'block';

        // Hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('please check your number')
    }
}

// Show Error
function showError(error){
    // hide results
    document.getElementById('results').style.display = 'none';

    // Hide loader
    document.getElementById('loading').style.display = 'none';
    // Create a div
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 2000);

    // Clear error
    function clearError(){
        document.querySelector('.alert').remove();
    }
}

