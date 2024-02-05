import { useState, useEffect } from 'react';
import './App.css'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, getFirestore, getDoc, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { auth, app } from '../firebase'

const db = getFirestore(app)

function App() {

  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessages, setNewMessages] = useState("")

useEffect(() => {
  const q = query(collection(db, 'message'), orderBy("timestamp"))
  const unsubscribe = onSnapshot(q, snapshot => {
    setMessages(snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })))
  })
  return unsubscribe
}, [])

useEffect( () =>{
  if(user){
    setUser(user)
  }
  else{
    setUser(null)
  }
}, [])

const sentMessages = async () =>{
  await addDoc(collection(db, "message"), {
    uid: user.uid,
    photoURL : user.photoURL,
    displayName : user.displayName,
    text : newMessages,
    timestamp : serverTimestamp()
  })

  setNewMessages("")
}

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
    } catch (error) {
      console.log(error.log)
    }
  }

  return (
    <div className='App'>
      {user ? (
        <>
          <div>
            logged in as {user.displayName}
          </div>
          <input
            value={newMessages}
            onChange={(e) => setNewMessages(e.target.value)}
            type="text"
          />
          <button onClick={sentMessages}>Send Message</button>
          <button onClick={() => auth.signOut()}>LogOut</button>
  
          {messages.map((msg) => (
            <div className={`message ${msg.data.uid=== user.uid ? 'current' : 'other'}`}>
              <img src={msg.data.photoURL} alt="" />
              {msg.data.text}
            </div>
          ))}
        </>
      ) : (
        <>
          <h2>RealTimeChat</h2>
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </>
      )}
    </div>
  );
  
}

export default App
