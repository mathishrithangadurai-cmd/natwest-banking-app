// ===== FORM HANDLING FOR CASH AND CHEQUE DEPOSITS/WITHDRAWALS =====

document.addEventListener('DOMContentLoaded', function() {
    
    // Handle currency inputs for cash forms
    const currencyInputs = document.querySelectorAll('.currency-input');
    currencyInputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });

    // Handle cheque amount input
    const chequeAmountInput = document.getElementById('chequeAmount');
    if (chequeAmountInput) {
        chequeAmountInput.addEventListener('input', calculateChequeTotal);
    }

    // Handle withdrawal amount input
    const withdrawAmountInput = document.getElementById('withdrawAmount');
    if (withdrawAmountInput) {
        withdrawAmountInput.addEventListener('input', calculateWithdrawTotal);
    }

    // Reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetForm);
    }

    // Save button
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', handleSave);
    }

    // Edit button
    const editBtn = document.getElementById('editBtn');
    if (editBtn) {
        editBtn.addEventListener('click', enableEdit);
    }

    // OK button in popup
    const okBtn = document.getElementById('okBtn');
    if (okBtn) {
        okBtn.addEventListener('click', closePopupAndRedirect);
    }
});

// Calculate total for cash deposit/withdrawal
function calculateTotal() {
    const currencyInputs = document.querySelectorAll('.currency-input');
    let total = 0;

    currencyInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        const denomination = parseInt(input.getAttribute('data-value'));
        total += value * denomination;
    });

    updateTotalDisplay(total);
}

// Calculate total for cheque deposit/withdrawal
function calculateChequeTotal() {
    const amountInput = document.getElementById('chequeAmount');
    const amount = parseInt(amountInput.value) || 0;
    updateTotalDisplay(amount);
}

// Calculate total for cash withdrawal
function calculateWithdrawTotal() {
    const amountInput = document.getElementById('withdrawAmount');
    const amount = parseInt(amountInput.value) || 0;
    updateTotalDisplay(amount);
}

// Update total display
function updateTotalDisplay(total) {
    const totalAmountInput = document.getElementById('totalAmount');
    const totalInWordsInput = document.getElementById('totalInWords');

    if (totalAmountInput) {
        totalAmountInput.value = formatCurrency(total);
    }

    if (totalInWordsInput) {
        totalInWordsInput.value = numberToWords(total);
    }
}

// Reset form
function resetForm() {
    // Get the form being used
    const form = document.getElementById('cashDepositForm') || 
                 document.getElementById('chequeDepositForm') ||
                 document.getElementById('cashWithdrawForm') ||
                 document.getElementById('chequeWithdrawForm');

    if (form) {
        // Clear only currency/amount fields
        const currencyInputs = form.querySelectorAll('.currency-input');
        currencyInputs.forEach(input => input.value = '');

        const chequeAmountInput = form.querySelector('#chequeAmount');
        if (chequeAmountInput) chequeAmountInput.value = '';

        const withdrawAmountInput = form.querySelector('#withdrawAmount');
        if (withdrawAmountInput) withdrawAmountInput.value = '';

        const numChequesInput = form.querySelector('#numCheques');
        if (numChequesInput) numChequesInput.value = '';

        // Reset totals
        calculateTotal();
    }
}

// Handle save button
function handleSave() {
    const totalAmountInput = document.getElementById('totalAmount');
    const totalAmount = totalAmountInput.value;

    if (totalAmount === '£0' || totalAmount === '') {
        alert('Please enter an amount before saving');
        return;
    }

    // Show branch code section
    const branchCodeSection = document.getElementById('branchCodeSection');
    if (branchCodeSection) {
        branchCodeSection.style.display = 'block';
    }

    // Disable currency inputs
    const currencyInputs = document.querySelectorAll('.currency-input');
    currencyInputs.forEach(input => input.disabled = true);

    const chequeAmountInput = document.getElementById('chequeAmount');
    if (chequeAmountInput) chequeAmountInput.disabled = true;

    const withdrawAmountInput = document.getElementById('withdrawAmount');
    if (withdrawAmountInput) withdrawAmountInput.disabled = true;

    const numChequesInput = document.getElementById('numCheques');
    if (numChequesInput) numChequesInput.disabled = true;

    // Update button visibility
    const saveBtn = document.getElementById('saveBtn');
    const editBtn = document.getElementById('editBtn');
    const resetBtn = document.getElementById('resetBtn');

    saveBtn.textContent = 'Final Save';
    editBtn.style.display = 'inline-block';
    saveBtn.onclick = handleFinalSave;
}

// Handle final save with branch code
function handleFinalSave() {
    const branchCodeInput = document.getElementById('branchCode');

    if (!branchCodeInput.value) {
        alert('Please enter the 6-digit branch code');
        return;
    }

    if (!/^[0-9]{6}$/.test(branchCodeInput.value)) {
        alert('Branch code must be exactly 6 digits');
        return;
    }

    // Generate token
    const tokenNumber = generateTokenNumber();

    // Save transaction
    const totalAmountInput = document.getElementById('totalAmount');
    const totalInWordsInput = document.getElementById('totalInWords');
    const totalAmount = totalAmountInput.value.replace('£', '').replace(/,/g, '');

    const form = document.getElementById('cashDepositForm') || 
                 document.getElementById('chequeDepositForm') ||
                 document.getElementById('cashWithdrawForm') ||
                 document.getElementById('chequeWithdrawForm');

    let transactionType = 'Transfer';
    if (form.id.includes('Deposit')) {
        transactionType = form.id.includes('Cash') ? 'Cash Deposit' : 'Cheque Deposit';
    } else {
        transactionType = form.id.includes('Cash') ? 'Cash Withdrawal' : 'Cheque Withdrawal';
    }

    const transaction = {
        type: transactionType,
        amount: totalAmount,
        amountInWords: totalInWordsInput.value,
        branchCode: branchCodeInput.value,
        status: 'Completed'
    };

    saveTransaction(transaction);

    // Show token popup
    showTokenPopup(tokenNumber);
}

// Show token popup
function showTokenPopup(tokenNumber) {
    const tokenPopup = document.getElementById('tokenPopup');
    const tokenNumberElement = document.getElementById('tokenNumber');

    if (tokenPopup && tokenNumberElement) {
        tokenNumberElement.textContent = tokenNumber;
        tokenPopup.style.display = 'flex';
    }
}

// Close popup and redirect
function closePopupAndRedirect() {
    const tokenPopup = document.getElementById('tokenPopup');
    if (tokenPopup) {
        tokenPopup.style.display = 'none';
    }

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 300);
}

// Enable edit mode
function enableEdit() {
    const currencyInputs = document.querySelectorAll('.currency-input');
    currencyInputs.forEach(input => input.disabled = false);

    const chequeAmountInput = document.getElementById('chequeAmount');
    if (chequeAmountInput) chequeAmountInput.disabled = false;

    const withdrawAmountInput = document.getElementById('withdrawAmount');
    if (withdrawAmountInput) withdrawAmountInput.disabled = false;

    const numChequesInput = document.getElementById('numCheques');
    if (numChequesInput) numChequesInput.disabled = false;

    const branchCodeSection = document.getElementById('branchCodeSection');
    if (branchCodeSection) {
        branchCodeSection.style.display = 'none';
    }

    // Reset button visibility
    const saveBtn = document.getElementById('saveBtn');
    const editBtn = document.getElementById('editBtn');
    
    saveBtn.textContent = 'Save';
    editBtn.style.display = 'none';
    saveBtn.onclick = handleSave;

    alert('Edit mode enabled. You can now modify the amount');
}

// Helper functions (from app.js, included for redundancy)
function generateTokenNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return 'NW' + timestamp.toString().slice(-6) + random.toString().padStart(4, '0');
}

function saveTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transaction.id = generateTokenNumber();
    transaction.timestamp = new Date().toLocaleString();
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    return transaction.id;
}

function formatCurrency(amount) {
    return '£' + parseInt(amount).toLocaleString('en-IN');
}

function numberToWords(num) {
    if (num === 0) return 'Zero Pounds Only';

    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const scales = ['', 'Thousand', 'Lakh', 'Crore', 'Arab', 'Kharab'];

    function convertGroup(n) {
        let words = '';
        
        if (n >= 100) {
            words += ones[Math.floor(n / 100)] + ' Hundred ';
            n %= 100;
        }
        
        if (n >= 20) {
            words += tens[Math.floor(n / 10)] + ' ';
            n %= 10;
        } else if (n >= 10) {
            words += teens[n - 10] + ' ';
            n = 0;
        }
        
        if (n > 0) {
            words += ones[n] + ' ';
        }
        
        return words.trim();
    }

    let words = '';
    let groupIndex = 0;
    
    // Handle in groups of 2 digits for British system (except first group which is 3 digits)
    let groups = [];
    if (num >= 1000) {
        // Get the last 3 digits
        groups.push(num % 1000);
        num = Math.floor(num / 1000);
        
        // Get remaining groups of 2 digits
        while (num > 0) {
            groups.push(num % 100);
            num = Math.floor(num / 100);
        }
    } else {
        groups.push(num);
    }

    // Process groups in reverse order
    for (let i = groups.length - 1; i >= 0; i--) {
        if (groups[i] !== 0) {
            let groupWords = convertGroup(groups[i]);
            
            if (i > 0 && scales[i]) {
                groupWords += ' ' + scales[i];
            }
            
            if (words.length > 0) {
                words += ' ' + groupWords;
            } else {
                words = groupWords;
            }
        }
    }

    return (words.trim() || 'Zero') + ' Pounds Only';
}