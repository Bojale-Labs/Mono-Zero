import { FC, useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import { useUI } from '@components/ui/context'

interface Props {}

const LoanRequestApproved: FC<Props> = () => {
  // Form State
  const { setModalView, closeModal, loanSelected, bankAccount } = useUI()
  //abstract component
  return (
    <div className="loan-success">
      <img
        onClick={() => {
          setModalView('ACCOUNT_DASHBOARD')
        }}
        src="/svg/return-arrow.svg"
        alt="return arrow"
      />
      <h4 className="loan-success-h4">Your loan request was successful!</h4>
      <div className="loan-success-content">
        <div className="loan-success-text">
          <h2 className="loan-success-content-h2">{loanSelected.type}</h2>
          <p className="loan-success-content-p">Loan Approved</p>
        </div>
        <div className="loan-success-info">
          <div className="loan-success-info-1">
            <span className="loan-success-avatar">
              <img src="/svg/picture.jpg" alt="A picture upload for avatar" />
            </span>
            <p className="loan-success-p">
              <span>Recepient</span>
              {bankAccount.name || 'Seyi Suya'}
            </p>
          </div>
          <p className="loan-success-p grid-item-2">
            <span>Reference number</span>
            {loanSelected.ref || '#D79004321786'}
          </p>
          <p className="loan-success-p">
            <span>Amount approved</span>
            N460,000
          </p>
          <p className="loan-success-p">
            <span>Interest rate</span>
            N2.00
          </p>
        </div>
        <div className="tx-c">
          <button className="loan-success-btn">Share</button>
        </div>
      </div>
      <p className="loan-success-footer-text">
        It will take less than 24 hours to process it
      </p>
    </div>
  )
}

export default LoanRequestApproved
