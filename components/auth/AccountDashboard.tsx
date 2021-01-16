import { FC, useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@components/ui'
import { useUI } from '@components/ui/context'
import axios from 'lib/axiosConfig'

interface Props {}

const AccountDashboard: FC<Props> = () => {
  const {
    setModalView,
    closeModal,
    bankAccount,
    currrentLoanAmt,
    loanScoreSummary,
  } = useUI()
  const [debits, setDebits] = useState(0)
  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
  }

  const mounted = useRef(false)
  const fetchUserBankActivities = useCallback(async () => {
    setLoading(true)
    try {
      if (mounted.current) {
        let totalCredits
        setLoading(true)
        axios
          .get(`accounts/${bankAccount._id}/credits`)
          .then((res) => {
            if (res.status === 200) {
              setCredits(res.data && res.data.total)
            } else {
              setMessage('Unable to fetch user CREDIT bank account activities')
            }
          })
          .then(async () => {
            axios.get(`accounts/${bankAccount._id}/debits`).then((res) => {
              if (res.status === 200) {
                setLoading(false)
                setDebits(res.data && res.data.total)
              } else {
                setMessage('Unable to fetch user DEBIT bank account activities')
              }
            })
          })
          .catch((err) => {
            setMessage(err)
          })
      }
    } catch (err) {
      setMessage(err)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    mounted.current = true
    fetchUserBankActivities()
    return () => {
      mounted.current = false
    }
  }, [bankAccount])

  return (
    <div className="main-screen">
      <div className="main-screen-top">
        <h2 className="main-screen-h2">
          NGN 7,042
          <span>Current Loan</span>
        </h2>
        <span className="main-screen-span">
          <img src="/svg/picture.jpg" alt="A picture of a lady" />
        </span>
      </div>
      <div className="main-screen-bottom">
        <div className="main-screen-balance-card">
          <div className="main-screen-balance">
            <h2 className="main-screen-balance-h2">
              <span>Credits</span>

              {new Intl.NumberFormat().format(credits) || ' N43,125'}
            </h2>
            <h2 className="main-screen-balance-h2">
              <span>Debits</span>

              {new Intl.NumberFormat().format(debits) || 'N27,300'}
            </h2>
          </div>
          <div className="main-screen-balance-text">
            <p>
              You’ve spent{' '}
              <span>{new Intl.NumberFormat().format(debits) || 'N70,425'}</span>{' '}
              this month. Your loan eligibility score is currently{' '}
              {loanScoreSummary.creditScore}
            </p>
            <Link href="">Tell me more</Link>
          </div>
        </div>
        <div className="checkout">
          <div className="main-screen-activity">
            <h4 className="main-screen-h4">Activity</h4>
            <div className="main-screen-activity-grid">
              <div
                onClick={() => {
                  setModalView('LOAN_LIST')
                }}
                className="main-screen-activity-griditem"
              >
                <span>
                  <img src="/svg/send.svg" alt="send svg" />
                </span>
                <p>Loans</p>
              </div>
              <div className="main-screen-activity-griditem">
                <span>
                  <img src="/svg/credit-card.svg" alt="credit-card svg" />
                </span>
                <p>Bank</p>
              </div>
              <div
                onClick={() => {
                  setModalView('FINANCE_SCORE')
                }}
                className="main-screen-activity-griditem"
              >
                <span>
                  <img src="/svg/growth.svg" alt="growth svg" />
                </span>
                <p>Finance Score</p>
              </div>
            </div>
          </div>
          <div className="main-screen-info">
            <h4 className="main-screen-h4">Your Information</h4>
            <div className="main-screen-info-card">
              <div className="main-screen-info-carditem">
                <span>
                  <img src="/svg/user.svg" alt="user svg" />
                </span>
                <p>{bankAccount.name || 'Odupe Cashew'}</p>
              </div>
              <div className="main-screen-info-carditem">
                <span>
                  <img src="/svg/identity-card.svg" alt="identity-card svg" />
                </span>
                <p>{bankAccount.accountNumber || '9823651740'}</p>
              </div>
              <div className="main-screen-info-carditem">
                <span>
                  <img src="/svg/email.svg" alt="email svg" />
                </span>
                <p>oredola.cashew@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountDashboard
