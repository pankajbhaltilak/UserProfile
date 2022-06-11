import { useRef, useState } from 'react';
import { setUser } from '../../services/users';
import styles from './UserForm.module.css';
import { backgroundHoc } from '../../hoc/backgroundHoc';

const UserForm = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fnameInputRef = useRef();
  const lnameInputRef = useRef();
  const emailInputRef = useRef();
  const mobileInputRef = useRef();

  const resetMessages = () => {
    // Reset the message
    setShowErrorMsg(false);
    setShowSuccessMsg(false);
  };

  const resetFields = () => {
    setFname('');
    setLname('');
    setEmail('');
    setMobile('');
  };

  const isFieldValidate = () => {
    let isFormValidate = true;
    const emailRegEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const validationSet = [
      {
        condition: !fname,
        errorMsg: 'First Name should be fill!!!',
        elementRef: fnameInputRef,
      },
      {
        condition: fname.length < 3,
        errorMsg: 'First Name should be at least 3 character',
        elementRef: fnameInputRef,
      },
      {
        condition: !lname,
        errorMsg: 'Last Name should be fill!!!',
        elementRef: lnameInputRef,
      },
      {
        condition: lname.length < 3,
        errorMsg: 'Last Name should be at least 3 character',
        elementRef: lnameInputRef,
      },
      {
        condition: !email,
        errorMsg: 'Email should be fill!!!',
        elementRef: emailInputRef,
      },
      {
        condition: !emailRegEx.test(email),
        errorMsg: 'Please enter valid email id',
        elementRef: emailInputRef,
      },
      {
        condition: !mobile,
        errorMsg: 'Mobile should be fill!!!',
        elementRef: mobileInputRef,
      },
      {
        condition: mobile.length < 10,
        errorMsg: 'Please enter valid mobile number.',
        elementRef: mobileInputRef,
      },
    ];

    for (let i = 0; i < validationSet.length; i++) {
      const validate = validationSet[i];
      if (validate.condition) {
        setShowErrorMsg(validate.errorMsg);
        isFormValidate = false;
        // control or uncontrol ???
        validate.elementRef.current.focus();
        break;
      }
    }

    // if (!fname) {
    //   setShowErrorMsg("First Name should be fill!!!");
    //   isFormValidate = false;
    // } else if (fname.length < 3) {
    //   setShowErrorMsg("First Name should be at least 3 character");
    //   isFormValidate = false;
    // } else if (!lname) {
    //   setShowErrorMsg("Last Name should be fill!!!");
    //   isFormValidate = false;
    // } else if (lname.length < 3) {
    //   setShowErrorMsg("Last Name should be at least 3 character");
    //   isFormValidate = false;
    // } else if (!email) {
    //   setShowErrorMsg("Email should be fill!!!");
    //   isFormValidate = false;
    // } else if (!emailRegEx.test(email)) {
    //   setShowErrorMsg("Please enter valid email id");
    //   isFormValidate = false;
    // } else if (!mobile) {
    //   setShowErrorMsg("Mobile should be fill!!!");
    //   isFormValidate = false;
    // } else if (mobile.length < 10) {
    //   setShowErrorMsg("Please enter valid mobile number.");
    //   isFormValidate = false;
    // }

    return isFormValidate;
  };

  const submitClickHandler = () => {
    // It will stop JS engine at browser side to debug step by step coding
    //debugger;
    resetMessages();

    // Genereic Validation
    // if (!(fname && lname && email && mobile)) {
    //   setShowErrorMsg("All fields are mandatory!!!");
    //   return;
    // }

    // Specific validation
    if (!isFieldValidate()) {
      return;
    }

    // Creating user data which need to send api
    const userData = {
      first_name: fname,
      last_name: lname,
      email,
      mobile,
    };

    // Setting loader true, just before the api call
    setIsLoading(true);

    setUser(userData)
      .then((data) => {
        setIsLoading(false);
        resetFields();
        setShowSuccessMsg(
          `User has been created successfully. User id - ${data.id}`
        );
      })
      .catch(() => {
        setIsLoading(false);
        setShowErrorMsg(
          'There is some error occurs. Please try after some time!!!'
        );
      });
  };

  return (
    <>
      <div className={styles.field}>
        <label>First Name : </label>
        <input
          ref={fnameInputRef}
          type="text"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Last Name : </label>
        <input
          ref={lnameInputRef}
          type="text"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Email Id : </label>
        <input
          ref={emailInputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Mobile No. : </label>
        <input
          ref={mobileInputRef}
          type="number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <button onClick={submitClickHandler} disabled={isLoading}>
        Submit
      </button>

      {isLoading && <div>Loading....</div>}

      {showSuccessMsg && (
        <div className={styles.successMsg}>
          Success Message : {showSuccessMsg}
        </div>
      )}

      {showErrorMsg && (
        <div className={styles.errorMsg}>Error Message : {showErrorMsg} </div>
      )}
    </>
  );
};

export default backgroundHoc(UserForm, 'yellowgreen');
