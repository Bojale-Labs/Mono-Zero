import { FC, useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import { useUI } from '@components/ui/context'

interface Props {}

const BankAccountCreated: FC<Props> = () => {
  const { setModalView, closeModal } = useUI()

  return (
    <div className="bank-success">
      <span className="bank-success-span">
        <img
          onClick={() => {
            setModalView('CREATE_ACCOUNT_VIEW')
          }}
          src="/svg/return-arrow.svg"
          alt="return arrow"
        />
      </span>
      <div className="bank-success-content">
        <div>
          <img src="/svg/vault.svg" alt="Man beside a bank vault" />
          <h4 className="bank-success-h4">Bank successfully added</h4>
        </div>
        <button
          onClick={() => {
            setModalView('FINANCE_SCORE')
          }}
          className="bank-success-btn"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default BankAccountCreated
