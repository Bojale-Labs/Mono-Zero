// @ts-nocheck
import React, { FC, useMemo } from 'react'
import { ThemeProvider } from 'next-themes'
import trackerApi from 'lib/tracking-api'
const headers = {
    'Content-Type': 'application/json',
 }

export interface State {
  displaySidebar: boolean
  displayDropdown: boolean
  displayModal: boolean
  displayToast: boolean
  modalView: string
  toastText: string
  bankAccount: object
  loanScoreSummary: object
  userInfo: object
  loans: []
  loanSelected: object
  currrentLoanAmt: number
}

const initialState = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: 'CREATE_ACCOUNT_VIEW',
  displayToast: false,
  toastText: '',
  userInfo: {
    income: undefined,
    loanAmount: undefined,
    age: undefined,
    debits: 0,
    credits: 0,
    transactionCount: 0,
  },
  loanScoreSummary: {
    meta: {},
    creditScore: 0,
    creditRating: '',
    approval: '',
    loanThreshold: 0,
    interest: 0,
  },
  bankAccount: {
    _id: '',
    institution: {},
    accountNumber: '',
    name: '',
    type: '',
    currency: '',
    bvn: '',
    balance: '',
  },
  currrentLoanAmt: 7042,
  loanSelected: {},
  loans: [
    {
      type: 'Electronics Loan',
      message: `Adu and Sons Power is 5% cheaper than your current power
                purchase, take a N5000 to start using them!`,
      score: 370,
      ref: '#D79004321782',
    },
    {
      type: 'Electronics Loan',
      message: `Peter and sons is 5% cheaper than your current power purchase,
              take a N5000 loan to start using them!`,
      score: 200,
      ref: '#D79004321783',
    },
    {
      type: 'School Loan',
      message: `Simbi and daughters is offering a 10% cheaper plan than your current school loan plan,
              take a N50000 to start using them!`,
      score: 180,
      ref: '#D79004321784',
    },

    {
      type: 'Grocery Loan',
      message: `Spar is 5% cheaper than your current food delivery service,
              take a N5000 to start using them!`,
      score: 370,
      ref: '#D79004321785',
    },

    {
      type: 'Grocery Loan',
      message: `Mall Mart is 9.5% cheaper than your current food delivery service,
              take a N15000 to start using them!`,
      score: 600,
    },
    {
      type: 'Jewelry Loan',
      message: `Exquisite cutters are delivering 5% cheaper than your current diamond abitrage shop,
              take a $5000 loan to start using them!`,
      score: 500,
      ref: '#D79004321787',
    },
  ],
}

type Action =
  | {
      type: 'OPEN_SIDEBAR'
    }
  | {
      type: 'CLOSE_SIDEBAR'
    }
  | {
      type: 'OPEN_TOAST'
    }
  | {
      type: 'CLOSE_TOAST'
    }
  | {
      type: 'SET_TOAST_TEXT'
      text: ToastText
    }
  | {
      type: 'SET_BANK_ACCOUNT'
      details: BankAccount
    }
  | {
      type: 'SET_LOAN_SCORE_SUMMARY'
      details: LoanScoreSummary
    }
  | {
      type: 'SET_USER_INFO'
      details: UserInfo
    }
  | {
      type: 'SET_LOAN_SELECTED'
      loan_selected: LoanSelected
    }
  | {
      type: 'OPEN_DROPDOWN'
    }
  | {
      type: 'CLOSE_DROPDOWN'
    }
  | {
      type: 'OPEN_MODAL'
    }
  | {
      type: 'CLOSE_MODAL'
    }
  | {
      type: 'SET_MODAL_VIEW'
      view: MODAL_VIEWS
    }

type MODAL_VIEWS =
  | 'CREATE_ACCOUNT_VIEW'
  | 'ACCOUNT_CREATED'
  | 'ACCOUNT_DASHBOARD'
  | 'BANK_ACCOUNT_CREATED'
  | 'LOAN_LIST'
  | 'LOAN_REQUEST_APPROVED'
  | 'LOAN_REQUEST_REJECTED'
  | 'FINANCE_SCORE'
type ToastText = string
type BankAccount = object
type LoanScoreSummary = object
type UserInfo = object
type LoanSelected = object
export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      }
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      }
    }
    case 'OPEN_DROPDOWN': {
      return {
        ...state,
        displayDropdown: true,
      }
    }
    case 'CLOSE_DROPDOWN': {
      return {
        ...state,
        displayDropdown: false,
      }
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      }
    }
    case 'OPEN_TOAST': {
      return {
        ...state,
        displayToast: true,
      }
    }
    case 'CLOSE_TOAST': {
      return {
        ...state,
        displayToast: false,
      }
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      }
    }
    case 'SET_TOAST_TEXT': {
      return {
        ...state,
        toastText: action.text,
      }
    }
    case 'SET_BANK_ACCOUNT': {
      return {
        ...state,
        bankAccount: action.details,
      }
    }
    case 'SET_LOAN_SCORE_SUMMARY': {
      return {
        ...state,
        loanScoreSummary: action.details,
      }
    }
    case 'SET_USER_INFO': {
      return {
        ...state,
        userInfo: action.details,
      }
    }
    case 'SET_LOAN_SELECTED': {
      return {
        ...state,
        loanSelected: action.loan_selected,
      }
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' })
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: 'CLOSE_SIDEBAR' })
      : dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' })

  const openDropdown = () => dispatch({ type: 'OPEN_DROPDOWN' })
  const closeDropdown = () => dispatch({ type: 'CLOSE_DROPDOWN' })

  const openModal = () => dispatch({ type: 'OPEN_MODAL' })
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  const openToast = () => dispatch({ type: 'OPEN_TOAST' })
  const closeToast = () => dispatch({ type: 'CLOSE_TOAST' })

  const setModalView = (view: MODAL_VIEWS) => {
     trackerApi.post('track', { path_name: view }, headers)
     dispatch({ type: 'SET_MODAL_VIEW', view })
  }
   
  const setLoanScoreSummary = (details) =>
    dispatch({ type: 'SET_LOAN_SCORE_SUMMARY', details })
  const setBankAccount = (details) =>
    dispatch({ type: 'SET_BANK_ACCOUNT', details })
  const setUserInfo = (details) => dispatch({ type: 'SET_USER_INFO', details })

  const setLoanSelected = (loan_selected) =>
    dispatch({ type: 'SET_LOAN_SELECTED', loan_selected })

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      setBankAccount,
      setUserInfo,
      setLoanSelected,
      openToast,
      setLoanScoreSummary,
      closeToast,
    }),
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UIProvider>
)
