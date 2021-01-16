import { FC, useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import Link from 'next/link'
import { useUI } from '@components/ui/context'
import loanCalculator from 'lib/loanCalculator'

interface Props {}

const FinanceScore: FC<Props> = () => {

  const {
    setModalView,
    loanScoreSummary,
    setUserInfo,
    userInfo,
    setLoanScoreSummary,
  } = useUI()

  useEffect(() => setLoanScoreSummary(loanCalculator(userInfo)), [])

  return (
    <div className="finance-score">
      <div className="finance-score-head">
        <div
          onClick={() => {
            setModalView('ACCOUNT_DASHBOARD')
          }}
          className="finance-score-head-inner1"
        >
          <span>
            <img
              src="/svg/return-arrow.svg"
              alt="A picture upload for avatar"
            />
          </span>
          <h4>Finance Score</h4>
        </div>
        <div className="mt-2">
          <span className="finace-score-medal">
            <img src="/svg/medal.svg" alt="image of a medal" />
            <span>{loanScoreSummary.creditScore}</span>
          </span>
          <h4 className="finance-score-h4">
            {' '}
            Your loan has been {loanScoreSummary.approval}, Your score was{' '}
            {loanScoreSummary.creditRating}{' '}
            {loanScoreSummary.approval === 'DENIED' &&
              `but
            can be better`}
            {loanScoreSummary.approval === 'ACCEPTED' &&
              `, loan payable with interest of ` + loanScoreSummary.interest}
          </h4>

          <p className="finance-score-p">Below are some recommendations</p>
        </div>
      </div>
      <div className="finance-score-content">
        <h4>Recommendation</h4>
        <div className="finance-score-grid">
          <div className="finance-score-grid-item">
            <span className="finance-score-number">+17</span>
            <div className="finance-score-note">
              <span>Loan rate</span>
              <p>
                You lent N46,800 more this past quarter. That’s 50% higher than
                normal
              </p>
              <Link href="">More details</Link>
            </div>
          </div>
          <div className="finance-score-grid-item">
            <span className="finance-score-number">+8</span>
            <div className="finance-score-note">
              <span>Paid</span>
              <p>
                You paid your recent loans quickly! Keep going for a better
                finance score.
              </p>
              <Link href="">More details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceScore
