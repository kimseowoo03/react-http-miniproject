import { useRef } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const UserSignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {displayName: name});
      console.log(user.user)
    } catch (error) {
      console.log(error.message)
    }

  };
  return (
    <form onSubmit={submitHandler} >
       <div>
        <label>name</label>
        <input type="text" ref={nameRef} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" ref={emailRef} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" ref={passwordRef} />
      </div>
      <button type="submit">회원가입</button>
    </form>
  )
}

export default UserSignUp;