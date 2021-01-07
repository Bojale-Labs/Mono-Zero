import { FC } from 'react'
import { Button } from '@components/ui'
import { useUI } from '@components/ui/context'

interface Props {}

const AccountCreated: FC<Props> = () => {
  const { setModalView } = useUI()

  return (
    <div className="account-created">
      <img
        onClick={() => {
          setModalView('CREATE_ACCOUNT_VIEW')
        }}
        src="/svg/check.svg"
        alt="Account created successfully"
      />
      <div>
        <h2 className="account-created-h2">Account Created!</h2>
        <p className="account-created-p">
          Dear user your account has been created successfully. Continue to
          start using app
        </p>
      </div>
      <button
        onClick={() => {
          setModalView('BANK_ACCOUNT_CREATED')
        }}
        className="account-created-btn"
      >
        Continue
      </button>
    </div>
  )
}

export default AccountCreated
