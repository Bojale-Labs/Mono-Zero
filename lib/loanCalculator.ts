// @ts-nocheck
function calculateScoreOnAge(age) {
  if (age <= 25) return 100
  if (age <= 33) return 120
  if (age <= 45) return 185
  if (age > 45) return 200
}

function calculateScoreOnBankStatement(profile) {
  let spending_nature =
    (profile.debits / profile.transactionCount) * 100 < 20 ? 'saver' : 'spender'

  if (spending_nature === 'saver') {
    return 225
  } else {
    return 110
  }
}

function calculateScoreOnIncome(income) {
  if (income <= 10000) return 120
  if (income <= 25000) return 140
  if (income <= 35000) return 180
  if (income <= 50000) return 200
  if (income > 25000) return 225
}

function calculateCreditScore(profile) {
  return (
    calculateScoreOnBankStatement(profile) +
    calculateScoreOnAge(profile.age) +
    calculateScoreOnIncome(profile.income)
  )
}

function calculateCreditRating(score) {
  if (score <= 370) return 'Poor'
  if (score <= 480) return 'Average'
  if (score <= 580) return 'Good'
  if (score <= 630) return 'Very Good'
  if (score > 630) return 'Great'
}
function calculateInterest(rating) {
  if (rating == 'Average') return 24.7
  if (rating == 'Good') return 18.9
  if (rating == 'Very Good') return 13.39
  if (rating == 'Great') return 6.99
  else return 29.99
}
function calculateLoanThreshold(rating) {
  if (rating == 'Average') return 30000
  if (rating == 'Good') return 40000
  if (rating == 'Very Good') return 50000
  if (rating == 'Great') return 70000
  else return 0
}

function createCalculation(loan, limit, term, interest) {
  let useLoan = loan
  if (loan > limit) {
    useLoan = limit
  }
  let totalInterest = (interest * useLoan * term) / 100
  let totalRepayment = totalInterest + useLoan
  let monthlyRepayment = totalRepayment / (term * 1) //1 month payment
  return {
    approvedLoan: useLoan,
    monthlyRepayment: monthlyRepayment,
    totalRepayment: totalRepayment,
    totalInterest: totalInterest,
  }
}

const calculateCreditSummary = (profile) => {
  let defProfile = {
    age: 0,
    income: 0,
    loanAmount: 0,
    type: 'personal',
    debits: 0,
    credits: 0,
    transactionCount: 0,
  }
  profile = Object.assign(defProfile, profile)
  let creditScore = calculateCreditScore(profile)
  let creditRating = calculateCreditRating(creditScore)
  let loanThreshold = calculateLoanThreshold(creditRating)
  let approvedInterest = calculateInterest(creditRating)
  let approval = 'DENIED'
  if (creditScore > 370) {
    approval = 'ACCEPTED'
    return {
      meta: profile,
      creditScore: creditScore,
      creditRating: creditRating,
      approval,
      loanThreshold: loanThreshold,
      interest: approvedInterest,
      repayment: createCalculation(
        profile.loanAmount,
        loanThreshold,
        1,
        approvedInterest
      ),
    }
  } else {
    return {
      meta: profile,
      creditScore: creditScore,
      creditRating: creditRating,
      approval,
    }
  }
}

export default calculateCreditSummary
