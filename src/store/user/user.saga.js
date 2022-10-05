import { takeLatest, all, put, call} from 'redux-saga/effects'
import { USER_ACTION_TYPES } from './user.types'
import { signInSuccess, signInFailed } from './user.action'
import { createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils'
import { signInAnonymously } from 'firebase/auth'

export function* getSnapshotFromUserAuth(userAuth, additonalDetails){
    try{
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additonalDetails)
        //console.log('userSnapshot is',userSnapshot.id)
        //console.log('userSnapshot data is', userSnapshot.exists())
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    }catch(error){
        yield put(signInFailed(error))
    }
}
export function* isUserAuthenticated(){
    try{
        const userAuth = yield call(getCurrentUser)
        console.log('userAuth in saga IUA', userAuth)
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    }catch(error){
        yield put(signInFailed(error))
    }
}

export function* signInWithGoogle(){
    try{
        const {user} = yield call(signInWithGooglePopup)
        yield call(getSnapshotFromUserAuth, user)
    }catch(error){
        yield put(signInFailed(error))
    }
}

export function* signInWithEmail({payload: {email, password}}){
    try{
        const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password)
        yield call(getSnapshotFromUserAuth, user)
    }catch(error){
        yield put(signInFailed(error))
    }
}
export function* onGoogleSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated )
}

export function* onEmailSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}
export function* userSaga(){
    yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart)])
}