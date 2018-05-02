import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';



export function studentsignupAction(user) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((studentcreatedUser) => {
                delete user.password;
                delete user.confirmPassword;
                user.uid = studentcreatedUser.uid;
                firebase.database().ref('/').child(`users/students/${user.uid}`).set(user)
                    .then(() => {
                        setTimeout(() => {
                        }, 2000)
                        history.push('/companydata');
                    })
            }).catch((error) => {
                dispatch({ type: ActionTypes.ERRORSTUDENTSU, payload: error.message });
            })
    }
}



export function studentsigninAction(user) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(user.email1, user.password1)
            .then((studentsignedinUser) => {
                let userid = studentsignedinUser.uid
                firebase.database().ref(`users/students/${userid}`).once('value')
                    .then((userData) => {
                        if (userData.val() === null) {
                            alert("user not found")
                            studentsignedinUser.delete()
                            history.push("/studentpage")
                        } else {
                            setTimeout(() => {
                                history.push('/companydata');
                            }, 2000)
                        }
                    })
            }).catch((error) => {
                dispatch({ type: ActionTypes.ERRORSTUDENTSN, payload: error.message });
            })
    }
}



export function companysignupAction(user) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((companycreatedUser) => {
                delete user.password;
                delete user.confirmPassword;
                user.uid = companycreatedUser.uid;
                firebase.database().ref('/').child(`users/company/${user.uid}`).set(user)
                    .then(() => {
                        setTimeout(() => {
                        }, 2000)
                        history.push('/jobpost');
                    })
            }).catch((error) => {
                dispatch({ type: ActionTypes.ERRORCOMPANYSU, payload: error.message });
            })
    }
}



export function companysigninAction(user) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(user.email1, user.password1)
            .then((companysignedinUser) => {
                let userid = companysignedinUser.uid
                firebase.database().ref(`users/company/${userid}`).once('value')
                    .then((userData) => {
                        if (userData.val() === null) {
                            alert("user not found");
                            companysignedinUser.delete()
                            history.push('/companypage')
                        } else {
                            setTimeout(() => {
                                history.push('/jobpost');
                            }, 2000)
                        }
                    })
            }).catch((error) => {
                dispatch({ type: ActionTypes.ERRORCOMPANYSN, payload: error.message });
            })
    }
}


export function adminsigninAction(user) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((adminsignedinUser) => {
                let userid = adminsignedinUser.uid
                firebase.database().ref(`users/admin/${userid}`).once('value')
                    .then((userData) => {
                        if (userData.val() === null) {
                            alert('user not found');
                            adminsignedinUser.delete()
                            history.push('/adminsignin')
                        } else {
                            setTimeout(() => {
                                history.push('/admin');
                            }, 2000)
                        }
                    })
            }).catch((error) => {
                dispatch({ type: ActionTypes.ERRORADMINSN, payload: error.message });
            })
    }
}


export function companydatarecv() {
    return dispatch => {
        firebase.database().ref(`/jobPost/`).on("value", snap => {
            let dbdata = snap.val();
            let dataarr = [];
            let datapushkey = []
            let uids = []
            for (var key in dbdata) {
                let obj = dbdata[key];
                uids.push(key)
                for (let key1 in obj) {
                    dataarr.push(obj[key1])
                    datapushkey.push(key1)
                }
            }
            dispatch({ type: ActionTypes.JOBPOSTDATA, payload: dataarr });
            dispatch({ type: ActionTypes.JOBPOSTDATAPUSHKEY, payload: datapushkey });
            dispatch({ type: ActionTypes.JOBUIDKEYS, payload: uids });
        })
    }
}



export function studentdatarecv() {
    return dispatch => {
        firebase.database().ref('users/students').on("value", snap => {
            let dbdata = snap.val();
            let dataarr = [];
            for (var key in dbdata) {
                dataarr.push(dbdata[key])
            }
            dispatch({ type: ActionTypes.STUDENTDATAFORCOMPANY, payload: dataarr })
        })
    }
}



export function companycurrentuserdata() {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref(`users/company/${user.uid}`).on('value', snap => {
                    let dbdata = snap.val()
                    dispatch({ type: ActionTypes.COMPANYPROFILEDATA, payload: dbdata })
                })
            }
        }
        )
    }
}



////Company Jobpost//////

export function jobpostdata(data) {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            let UID = user.uid
            data.uid = UID
            firebase.database().ref(`/jobPost/${UID}`).push(data)
                .then(() => { alert('Job Post Successfully') })
        });
    }
}



///// Company Code////////
export function mycompanyjobpostdata() {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref(`jobPost/${user.uid}`).on('value', snap => {
                    let dbdata = snap.val()
                    let dataarr = [];
                    for (var key in dbdata) {
                        dataarr.push(dbdata[key])
                    }
                    dispatch({ type: ActionTypes.MYCOMPANYJOBPOSTDATA, payload: dataarr })
                })
            }
        })
    }
}




export function studentprofiledata() {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref(`users/students/${user.uid}`).on("value", snap => {
                    let dbdata = snap.val();
                    dispatch({ type: ActionTypes.STUDENTPROFILEDATA, payload: dbdata })
                })
            }

        })
    }
}


export function companyusers() {
    return dispatch => {
        firebase.database().ref(`users/company/`).on('value', snap => {
            let dbdata = snap.val()
            let dataarr = [];
            for (var key in dbdata) {
                dataarr.push(dbdata[key])
            }
            dispatch({ type: ActionTypes.COMPANYUSERS, payload: dataarr })
        })
    }
}


export function admindelFuncstudent(valueid, index) {
    return dispatch => {
        firebase.database().ref(`users/students/${valueid}`).remove()
    }
}


export function deletecompusers(uid, index) {
    return dispatch => {
        firebase.database().ref(`users/company/${uid}`).remove()
        firebase.database().ref(`jobPost/${uid}/`).remove()
    }
}


export function deletejobfunc(uid, key) {
    return dispatch => {
        firebase.database().ref(`jobPost/${uid}/${key}`).remove()
    }
}


export function studentprofileupdate(val, index) {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref('/').child(`users/students/${user.uid}`).update({ username: val.editname, number: val.editnumber, qualification: val.editqualification })
        })
    }
}


export function jobapply(currentuid, key) {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref(`/users/students/${user.uid}/`).once('value').then((snap) => {
                    let data = snap.val()
                    let apply = false;
                    let obj = {
                        uid: data.uid,
                        username: data.username,
                        email: data.email,
                        number: data.number,
                        qualification: data.qualification
                    }
                    firebase.database().ref(`/jobPost/${currentuid}/${key}`).once('value')
                        .then((snap) => {
                            let data = snap.val()
                            var applicants = data.applicants
                            if (applicants) {
                                for (let key in applicants) {
                                    let appliedstudents = (applicants[key])
                                    if (appliedstudents.uid === obj.uid) {
                                        apply = true;
                                        break;
                                    }
                                }
                            }
                            if (apply) {
                                alert('You are already applied!');
                            } else {
                                firebase.database().ref(`/jobPost/${currentuid}/${key}/applicants`).push(obj)
                                    .then(() => {
                                        alert('Applied successfully');
                                    })
                            }

                        })
                })
            }
        })
    }
}

export function appliedstudents(uid, key) {
    return dispatch => {
        firebase.database().ref(`/jobPost/${uid}/${key}/applicants/`).on('value', snap => {
            let dbdata = snap.val()
            let dataarr = [];
            for (var key in dbdata) {
                dataarr.push(dbdata[key])
            }
            dispatch({ type: ActionTypes.APPLIEDSTUDENTS, payload: dataarr })
        })
    }
}



export function signout() {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            window.location.reload();
            localStorage.clear()
            setTimeout(function () {
                history.push('/')
            }, 3000);
        }).catch(function (error) {
            alert(error.msg)
        });
    }
}









