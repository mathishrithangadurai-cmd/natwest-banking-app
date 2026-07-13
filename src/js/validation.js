// ===== FORM VALIDATION FUNCTIONS =====

// Validate currency input
function validateCurrencyInput(value) {
    return /^\d+$/.test(value) || value === '';
}

// Validate branch code
function validateBranchCode(value) {
    return /^[0-9]{6}$/.test(value);
}

// Validate amount
function validateAmount(value) {
    const amount = parseInt(value) || 0;
    return amount > 0;
}

// Validate all currency fields combined
function validateCurrencyFields() {
    const currencyInputs = document.querySelectorAll('.currency-input');
    let totalAmount = 0;

    for (let input of currencyInputs) {
        const value = parseInt(input.value) || 0;
        const denomination = parseInt(input.getAttribute('data-value'));
        totalAmount += value * denomination;
    }

    return totalAmount > 0;
}

// Validate form before submission
function validateFormBeforeSubmit() {
    const form = document.getElementById('cashDepositForm') || 
                 document.getElementById('chequeDepositForm') ||
                 document.getElementById('cashWithdrawForm') ||
                 document.getElementById('chequeWithdrawForm');

    if (!form) return true;

    if (form.id.includes('Cheque')) {
        // Validate cheque form
        const numChequesInput = document.getElementById('numCheques');
        const amountInput = document.getElementById('chequeAmount');

        if (!numChequesInput.value) {
            alert('Please enter number of cheques');
            return false;
        }

        if (!amountInput.value) {
            alert('Please enter amount');
            return false;
        }

        if (!validateAmount(amountInput.value)) {
            alert('Amount must be greater than 0');
            return false;
        }
    } else if (form.id.includes('Withdraw') && form.id.includes('Cheque')) {
        // Validate cheque withdrawal form (no num cheques field)
        const amountInput = document.getElementById('chequeAmount');

        if (!amountInput.value) {
            alert('Please enter amount');
            return false;
        }

        if (!validateAmount(amountInput.value)) {
            alert('Amount must be greater than 0');
            return false;
        }
    } else {
        // Validate cash form
        if (!validateCurrencyFields()) {
            alert('Please enter at least one currency denomination');
            return false;
        }
    }

    return true;
}

// Real-time validation for currency inputs
document.addEventListener('DOMContentLoaded', function() {
    const currencyInputs = document.querySelectorAll('.currency-input');
    
    currencyInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateCurrencyInput(this.value)) {
                alert('Please enter a valid quantity (numbers only)');
                this.value = '';
            }
        });
    });

    const branchCodeInput = document.getElementById('branchCode');
    if (branchCodeInput) {
        branchCodeInput.addEventListener('blur', function() {
            if (this.value && !validateBranchCode(this.value)) {
                alert('Branch code must be exactly 6 digits');
                this.value = '';
            }
        });
    }

    const chequeAmountInput = document.getElementById('chequeAmount');
    if (chequeAmountInput) {
        chequeAmountInput.addEventListener('blur', function() {
            if (this.value && !validateAmount(this.value)) {
                alert('Amount must be greater than 0');
                this.value = '';
            }
        });
    }
});

function validateWithdrawForm() {
    const amount = document.getElementById('withdraw-amount').value;
    let valid = true;

    if (amount.trim() === '' || isNaN(amount) || Number(amount) <= 0) {
        valid = false;
        alert('Please enter a valid withdrawal amount.');
    }

    return valid;
}

function validateChequeForm() {
    const chequeCount = document.getElementById('cheque-count').value;
    const amount = document.getElementById('cheque-amount').value;
    let valid = true;

    if (chequeCount.trim() === '' || isNaN(chequeCount) || Number(chequeCount) <= 0) {
        valid = false;
        alert('Please enter a valid number of cheques.');
    }

    if (amount.trim() === '' || isNaN(amount) || Number(amount) <= 0) {
        valid = false;
        alert('Please enter a valid amount.');
    }

    return valid;
}