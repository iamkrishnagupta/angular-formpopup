import { Component, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form: any = {
    clientID: '',
    dob: '',
    lastRepaymentDate: null,
    disbursalDate: null,
    remainingLoanTenure: null,
    loanPaymentTenure: null,
    loanLender1: '',
    nomineeName: '',
    nomineeDob: '',
    moneyLenderName: '',
    loanAccountNumber: null,
    loanType: '',
    collateral: '',
    interestRate: null,
    interestType: '',
    monthlyEMIAccount: null,
    emiDate: '',
    emiDeductionBankDetails: '',
    loanInsuranceDetails: '',
    futureLoanRequirements: '',
    requirementType: '',
  };

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  lenders: any[] = [];
  successMessage: string = ''; // Initialize success message
  formCounter: number = 1; // Form ID counter
  formData: { [formId: string]: any } = {};
  formId: string = ''; // Initialize formId

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      this.formData = JSON.parse(savedData);
    }
  
    const savedLenders = localStorage.getItem('lenders');
    if (savedLenders) {
      this.lenders = JSON.parse(savedLenders);
    }
  
    const savedFormCounter = localStorage.getItem('formCounter');
  if (savedFormCounter) {
    // Find the maximum form number from existing form data
    const maxFormNumber = Object.keys(this.formData)
      .map(key => parseInt(key.split('-')[1]))
      .reduce((max, num) => (num > max ? num : max), 0);

    // Set the formCounter to the next available number
    this.formCounter = maxFormNumber + 1;
  } else {
    this.formCounter = 1;
  }
  
    // Generating a unique formId when initializing
    this.formId = this.generateUniqueFormId();
  }
  

  addLoanLender() {
    this.lenders.push({ name: '', dob: '' });
    this.saveFormDataToLocalStorage();
  }

  removeLoanLender(index: number) {
    this.lenders.splice(index, 1);
    this.saveFormDataToLocalStorage();
  }

  submitForm(formId: string) {
    // Retrieve the form data using the formId
    const formData = this.formData[formId];
    this.formData[formId] = {
      clientID: this.form.clientID,
      dob: this.form.dob,
      lastRepaymentDate: this.form.lastRepaymentDate,
      disbursalDate: this.form.disbursalDate,
      remainingLoanTenure: this.form.remainingLoanTenure,
      loanPaymentTenure: this.form.loanPaymentTenure,
      loanLender1: this.form.loanLender1,
      nomineeName: this.form.nomineeName,
      nomineeDob: this.form.nomineeDOb,
      moneyLenderName: this.form.moneyLenderName,
      loanAccountNumber: this.form.loanAccountNumber,
      loanType: this.form.loanType,
      collateral: this.form.collateral,
      interestRate: this.form.interestRate,
      interestType: this.form.interestType,
      monthlyEMIAccount: this.form.monthlyEMIAccount,
      emiDate: this.form.emiDate,
      emiDeductionBankDetails: this.form.emiDeductionBankDetails,
      loanInsuranceDetails: this.form.loanInsuranceDetails,
      futureLoanRequirements: this.form.futureLoanRequirements,
      requirementType: this.form.requirementType,
    };
    // Check if the form data exists
    // if (formData) {
    //   console.log('Form submitted:', formData);
    //   console.log('Lenders data:', this.lenders);
    //   this.saveFormDataToLocalStorage();

    //   this.successMessage = 'Form Submitted Successfully!';
    //   this.showPopup(this.successMessage);
    // }
   
      console.log('Form submitted:', formData);
      console.log('Lenders data:', this.lenders);
      this.saveFormDataToLocalStorage();

      this.successMessage = 'Form Submitted Successfully!';
      this.showPopup(this.successMessage);
    
  }

  calculateRemainingLoanTenure() {
    if (this.form.lastRepaymentDate) {
      const lastRepaymentDate = new Date(this.form.lastRepaymentDate);
      const currentDate = new Date();
      const yearsDiff = lastRepaymentDate.getFullYear() - currentDate.getFullYear();
      const monthsDiff = lastRepaymentDate.getMonth() - currentDate.getMonth();
      const daysDiff = lastRepaymentDate.getDate() - currentDate.getDate();
      const diffInMonths = yearsDiff * 12 + monthsDiff + (daysDiff > 0 ? 1 : 0);
      //i have put this to avoid the negative value
      this.form.remainingLoanTenure = Math.max(0, diffInMonths);

      this.saveFormDataToLocalStorage();
    }
  }

  calculateLastRepaymentDate() {
    if (this.form.disbursalDate && this.form.loanPaymentTenure) {
      const disbursalDate = new Date(this.form.disbursalDate);
      const loanPaymentTenure = this.form.loanPaymentTenure;
      const lastRepaymentDate = new Date(disbursalDate);
      lastRepaymentDate.setMonth(disbursalDate.getMonth() + loanPaymentTenure);

      this.form.lastRepaymentDate = lastRepaymentDate.toISOString().split('T')[0];
      this.saveFormDataToLocalStorage();
    }
  }

  // Function to generate a unique form ID
  generateFormId() {
    return `form-${this.formCounter++}`;
  }

  // Function to create a new form
  onAddNewForm() {
    const formId = this.generateUniqueFormId();
    this.formId = formId;

    // Clear all form fields by resetting the form object
    this.form = {
      clientID: '',
      dob: '',
      lastRepaymentDate: null,
      disbursalDate: null,
      remainingLoanTenure: null,
      loanPaymentTenure: null,
      loanLender1: '',
      // Include other form fields here
      nomineeName: '',
      moneyLenderName: '',
      loanAccountNumber: null,
      loanType: '',
      collateral: '',
      interestRate: null,
      interestType: '',
      monthlyEMIAccount: null,
      emiDate: '',
      emiDeductionBankDetails: '',
      loanInsuranceDetails: '',
      futureLoanRequirements: '',
      requirementType: '',
    };

    // Save the updated formData to local storage
    this.saveFormDataToLocalStorage();
  }

  // Remove a form and its data
  removeForm(formId: string) {
    delete this.formData[formId];
    this.saveFormDataToLocalStorage();
  }

  // Function to generate a unique form ID that doesn't already exist
  generateUniqueFormId() {
    let newFormId = this.generateFormId();
    while (this.formData[newFormId]) {
      // Check if the formId already exists in formData
      newFormId = this.generateFormId(); // Generate a new one until it's unique
    }
    return newFormId;
  }

  private saveFormDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(this.formData));
    localStorage.setItem('lenders', JSON.stringify(this.lenders));
    localStorage.setItem('formCounter', this.formCounter.toString());
  }

  private showPopup(message: string) {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    alert(message);
    this.renderer.removeStyle(document.body, 'overflow');
  }
}
