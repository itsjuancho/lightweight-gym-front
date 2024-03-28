import React, {Suspense} from 'react'
import RecoverPassword from '../../components/recoverPassword/RecoverPassword'

const PasswordResetPage = () => {
  return <Suspense fallback={<div>Loading...</div>}><RecoverPassword title={"Restore Password"} labelButton={"Restore Forgot Password"} /></Suspense>

}

export default PasswordResetPage