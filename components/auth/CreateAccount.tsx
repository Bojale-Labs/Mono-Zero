import { FC, useEffect, useState, useCallback, useRef } from 'react'
import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Logo, Button, Input, LoadingDots } from '@components/ui'
import axios from 'lib/axiosConfig'

const isBrowser = () => typeof window !== 'undefined'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)
interface Props {}

const CreateAccount = () => {
  const [monoCode, setMonoCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [disabled, setDisabled] = useState(false)

  {
    /* 
  // @ts-ignore */
  }
  const [monoInstance, setMonoInstance] = useState({})
  const {
    setModalView,
    closeModal,
    setBankAccount,
    setUserInfo,
    userInfo,
    bankAccount,
    modalView,
  } = useUI()

  const [isComponentMounted, setIsComponentMounted] = useState(false)

  useEffect(() => setIsComponentMounted(true), [])

  const mounted = useRef(false)

  const fetchUserInfo = useCallback(async () => {
    setLoading(true)
    try {
      if (mounted.current && monoInstance) {
        let headers = {
          'Content-Type': 'application/json',
        }

        let code = ''
        setLoading(true)
        axios
          .post('account/auth', { code: monoCode }, headers)
          .then((res) => {
            if (res.status === 200) {
              code = res.data && res.data.id
            }
          })
          .then(async () => {
            await axios.get(`accounts/${code}`).then((res) => {
              if (res.status === 200) {
                let bankData = res.data && res.data
                setLoading(false)
                setBankAccount(bankData.account)
              }
            })
          })
          .then(async () => {
            await axios
              .get(`accounts/${code}/statement?period=last6months`)
              .then((res) => {
                if (res.status === 200) {
                  let statementData = res.data && res.data
                  setLoading(false)
                  let statement = {
                    debits: 0,
                    credits: 0,
                    transactionCount: statementData.meta.count,
                  }
                  statementData.data.map((transaction) => {
                    transaction.type === 'debit'
                      ? (statement.debits = statement.debits + 1)
                      : (statement.credits = statement.credits + 1)
                  })

                  setUserInfo(Object.assign(userInfo, statement))
                }
              })
          })
          .catch((err) => {
            /*   setMessage('An error occured', err)
             */
          })
      }
    } catch (err) {
      setMessage(err)
    }
    setLoading(false)
  }, [monoCode, monoInstance])

  useEffect(() => {
    mounted.current = true
    fetchUserInfo()

    return () => {
      mounted.current = false
    }
  }, [monoCode])

  useEffect(() => {
    mounted.current = true
    if (!monoCode && isBrowser()) {
      let MonoConnect = require('@mono.co/connect.js')
      let monoInstance = new MonoConnect({
        onClose: () => setModalView('CREATE_ACCOUNT_VIEW'),
        onSuccess: ({ code }: { code: string }) => {
          if (code) {
            setMonoCode(code)
          }
        },
        key: process.env.NEXT_PUBLIC_TEST_PUBLIC_KEY,
      })
      monoInstance.setup()
      setMonoInstance(monoInstance)
    }
    return () => {
      mounted.current = false
    }
  }, [])

  const openMonoModal = (code: string) => {
    if (modalView === 'CREATE_ACCOUNT_VIEW') {
      ;(monoInstance as any).open()
    }
  }

  const submitForm = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault
    setUserInfo(userInfo)
    setModalView('ACCOUNT_CREATED')
  }
  const onChange = (value, name) => {
    setUserInfo(Object.assign(userInfo, { [name]: value }))
  }
  return (
    <div>
      {/* 
          // @ts-ignore */}
      {loading || !isComponentMounted ? (
        <Loading />
      ) : isComponentMounted && !monoCode ? (
        openMonoModal(monoCode)
      ) : (
        bankAccount.name && (
          <form
            onSubmit={submitForm}
            className="w-80 flex flex-col justify-between p-3"
          >
            <div className="flex flex-col space-y-4">
              {message && (
                <div className="text-red border border-red p-3">{message}</div>
              )}
              <Input
                placeholder="Name"
                value={bankAccount.name || ''}
                disabled
              />
              <Input
                placeholder="Account Number"
                value={bankAccount.accountNumber || ''}
                disabled
              />
              <Input
                placeholder="Account Type"
                value={bankAccount.institution.type || ''}
              />
              <Input
                placeholder="Bank "
                value={bankAccount.institution.name || ''}
              />

              <Input
                type="number"
                placeholder="Your Income"
                name="income"
                value={userInfo.income}
                onChange={onChange}
              />
              <Input
                type="number"
                placeholder="Amount You Want To Loan"
                name="loanAmount"
                value={userInfo.loanAmount}
                onChange={onChange}
              />
              <Input
                type="number"
                placeholder="Your Age"
                name="age"
                value={userInfo.age}
                onChange={onChange}
              />

              <div className="pt-2 w-full flex flex-col">
                <Button
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={disabled}
                >
                  Continue
                </Button>
              </div>
            </div>
          </form>
        )
      )}
    </div>
  )
}
export default CreateAccount
