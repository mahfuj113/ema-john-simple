import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'; // Import Firebase auth providers
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
}

export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(fbProvider).then(function (result) {
    var token = result.credential.accessToken;
    var user = result.user;
    user.success = true;
    return user;
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });
}

export const handleSignOut = () => {
  return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      return signedOutUser;
    }).catch(err => {
      // An error happened.
    });
}

export const createUserWithEmailAndPassword = (name, email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPasswordFirebase(auth, email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch(function (error) {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function () {
    console.log('user name updated successfully')
  }).catch(function (error) {
    console.log(error)
  });
}

// new code

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'; // Import Firebase auth providers
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// import firebaseConfig from './firebase.config';

// export const initializeLoginFramework = () => {
//   if (firebase.apps.length === 0) {
//     const app = initializeApp(firebaseConfig);
//   }
// }

// export const handleGoogleSignIn = () => {
//   const auth = getAuth();
//   const googleProvider = new GoogleAuthProvider();
//   return signInWithPopup(auth, googleProvider)
//     .then((res) => {
//       const { displayName, photoURL, email } = res.user;
//       const signedInUser = {
//         isSignedIn: true,
//         name: displayName,
//         email: email,
//         photo: photoURL,
//         success: true,
//       };
//       return signedInUser;
//     })
//     .catch((err) => {
//       console.log(err);
//       console.log(err.message);
//     });
// }

// export const handleFbSignIn = () => {
//   const auth = getAuth();
//   const fbProvider = new FacebookAuthProvider();
//   return signInWithPopup(auth, fbProvider)
//     .then((result) => {
//       var token = result.credential.accessToken;
//       var user = result.user;
//       user.success = true;
//       return user;
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     });
// }

// export const handleSignOut = () => {
//   const auth = getAuth();
//   return signOut(auth)
//     .then((res) => {
//       const signedOutUser = {
//         isSignedIn: false,
//         name: '',
//         email: '',
//         photo: '',
//         error: '',
//         success: false,
//       };
//       return signedOutUser;
//     })
//     .catch((err) => {
//       // An error happened.
//     });
// }

// export const createUserWithEmailAndPassword = (name, email, password) => {
//   const auth = getAuth();
//   return createUserWithEmailAndPassword(auth, email, password)
//     .then((res) => {
//       const newUserInfo = res.user;
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       updateUserName(name);
//       return newUserInfo;
//     })
//     .catch((error) => {
//       const newUserInfo = {};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       return newUserInfo;
//     });
// }

// export const signInWithEmailAndPassword = (email, password) => {
//   const auth = getAuth();
//   return signInWithEmailAndPassword(auth, email, password)
//     .then((res) => {
//       const newUserInfo = res.user;
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       return newUserInfo;
//     })
//     .catch((error) => {
//       const newUserInfo = {};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       return newUserInfo;
//     });
// }

// const updateUserName = (name) => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   user.updateProfile({
//     displayName: name,
//   })
//     .then(() => {
//       console.log('User name updated successfully');
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
