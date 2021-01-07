import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.css'
import { useRouter } from 'next/router'
import React, { FC, useState, useEffect } from 'react'
import { useUI } from '@components/ui/context'
import { Button, Modal, LoadingDots } from '@components/ui'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}

const CreateAccount = dynamic(
  () => import('@components/auth/CreateAccount'),
  dynamicProps
)
const AccountCreated = dynamic(
  () => import('@components/auth/AccountCreated'),
  dynamicProps
)
const BankAccountCreated = dynamic(
  () => import('@components/auth/BankAccountCreated'),
  dynamicProps
)
const AccountDashboard = dynamic(
  () => import('@components/auth/AccountDashboard'),
  dynamicProps
)

const LoanList = dynamic(
  () => import('@components/auth/LoanList'),
  dynamicProps
)

const LoanRequestApproved = dynamic(
  () => import('@components/auth/LoanRequestApproved'),
  dynamicProps
)

const LoanRequestRejected = dynamic(
  () => import('@components/auth/LoanRequestRejected'),
  dynamicProps
)

const FinanceScore = dynamic(
  () => import('@components/auth/FinanceScore'),
  dynamicProps
)

interface Props {
  pageProps: {
    // pages?: Page[]
  }
}

const Layout: FC<Props> = ({ children, pageProps }) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    setModalView,
    openModal,
    modalView,
  } = useUI()

  const { locale = 'en-US' } = useRouter()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const handleGetStarted = () => {
    setModalView('CREATE_ACCOUNT_VIEW')
    openModal()
  }
  return (
    <>
      <a className={cn('sr')} href="#main">
        Skip to content
      </a>
      <h1 className={cn('sr')}></h1>
      <main>
        {!displayModal && (
          <div className={cn('splash-screen')}>
            <h1>Mono Zero</h1>
            <Button
              variant="slim"
              loading={loading}
              disabled={disabled}
              onClick={(e: React.SyntheticEvent<EventTarget>) => {
                e.preventDefault()
                handleGetStarted()
              }}
            >
              Get Started
            </Button>
          </div>
        )}
        <Modal open={displayModal} onClose={closeModal}>
          {modalView === 'CREATE_ACCOUNT_VIEW' && <CreateAccount />}
          {modalView === 'ACCOUNT_CREATED' && <AccountCreated />}
          {modalView === 'BANK_ACCOUNT_CREATED' && <BankAccountCreated />}
          {modalView === 'ACCOUNT_DASHBOARD' && <AccountDashboard />}
          {modalView === 'LOAN_LIST' && <LoanList />}
          {modalView === 'LOAN_REQUEST_APPROVED' && <LoanRequestApproved />}
          {modalView === 'LOAN_REQUEST_REJECTED' && <LoanRequestRejected />}
          {modalView === 'FINANCE_SCORE' && <FinanceScore />}
        </Modal>
      </main>
    </>
  )
}

export default Layout
