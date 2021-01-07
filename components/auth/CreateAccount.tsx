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
    setModalView('ACCOUNT_CREATED')
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
