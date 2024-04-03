import React, {Suspense} from 'react'
import RecoverPassword from '../../components/recoverPassword/RecoverPassword'

const PasswordResetPage = () => {
  return <Suspense fallback={<div>Loading...</div>}><RecoverPassword title={"Forgot Password"} labelButton={"Forgot Password"} /></Suspense>

}

export default PasswordResetPage