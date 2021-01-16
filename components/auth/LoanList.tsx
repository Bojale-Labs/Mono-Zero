import { FC, useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import { useUI } from '@components/ui/context'
import loanCalculator from 'lib/loanCalculator'

interface Props {}

const LoanList: FC<Props> = () => {
  const {
    setModalView,
    closeModal,
    loans,
    setLoanSelected,
    loanScoreSummary,
    setLoanSummary,
    userInfo,
  } = useUI()

  useEffect(() => setLoanSummary(loanCalculator(userInfo)), [])

  const handleLoanRequest = (loan: any = {}) => {
    let verdict =
      loan && loan.score < loanScoreSummary.creditScore
        ? 'LOAN_REQUEST_APPROVED'
        : 'LOAN_REQUEST_REJECTED'
    setLoanSelected(loan)
    setModalView(verdict)
  }

  return (
    <div className="select-loan">
      <div className="select-loan-head">
        <div className="select-loan-head-inner">
          <img
            onClick={() => {
              setModalView('ACCOUNT_DASHBOARD')
            }}
            src="/svg/return-arrow.svg"
            alt="return arrow"
          />
          <h4>Select a loan</h4>
        </div>
      </div>

      <div className="select-loan-content">
        {loans.map((loan: any = {}, i: number) => (
          <div
            key={i}
            onClick={(e) => {
              e.preventDefault()
              handleLoanRequest(loan)
            }}
            className="select-loan-item"
          >
            <div className="select-loan-item-text">
              <h5>{loan.type}</h5>
              <p>{loan.message}</p>
            </div>
            <div className="select-loan-status">
              <span>
                <img src="/svg/check.svg" alt="check" />
              </span>
              <p>
                You {loan.score > loanScoreSummary.creditScore && `don't `} qualify
                for this loan.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoanList
