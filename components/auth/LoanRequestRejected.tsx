import { FC, useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import { useUI } from '@components/ui/context'

interface Props {}

const LoanRequestRejected: FC<Props> = () => {
  const { setModalView, closeModal } = useUI()

  return (
    <div className="loan-reject">
      <h4 className="loan-reject-h4">Your loan request was not successful!</h4>
      <img
        src="/svg/feeling-sorry.svg"
        alt="A lady feeling sorry"
        className="loan-reject-img"
      />
      <div>
        <p className="loan-reject-p">
          Unfortunately your loan request was not successful. Your finance score
          was not high enough to guarantee loan.
        </p>
        <a
          onClick={(e) => {
            e.preventDefault()
            setModalView('ACCOUNT_DASHBOARD')
          }}
          className="loan-reject-link"
        >
          Back To Dashboard
        </a>
      </div>
    </div>
  )
}

export default LoanRequestRejected
