import React, { useState, useEffect } from "react"
import { Modal, Button, Form } from "semantic-ui-react"

import "./App.css"
import Post from "./Post"

import { auth, db } from "./firebase"
import ImageUpload from "./ImageUpload"

function App() {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [opensignin, setOpensignin] = useState(false)
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const [user, setuser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        console.log(authUser)
        setuser(authUser)
      } else {
        //user logged out
        setuser(null)
      }
    })
    return () => {
      //clean up action
      unsubscribe()
    }
  }, [user, username])

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    })
  }, [])

  const signUp = (event) => {
    event.preventDefault()
    if (username && email && password) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          setOpen(false)
          return authUser.user.updateProfile({ displayName: username })
        })
        .catch((error) => alert(error.message))
    } else {
      window.alert("Please fill missing fields!")
    }
    //setOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault()
    if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((authUser) => {
          setOpensignin(false)
        })
        .catch((error) => alert(error.message))
    } else {
      alert("Please provide email and password")
    }
  }

  return (
    <div className='app'>
      <Modal
        centered={true}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        size='mini'
      >
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Username</label>
              <input
                type='text'
                value={username}
                onChange={(e) => setusername(e.target.value)}
                placeholder='Username..'
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder='A valid email..'
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder='Strong password..'
                required
              />
            </Form.Field>
            <Form.Field>
              <Button type='submit' color='green' onClick={signUp}>
                Sign Up
              </Button>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Sign In modal*/}

      <Modal
        centered={true}
        open={opensignin}
        onClose={() => setOpensignin(false)}
        onOpen={() => setOpensignin(true)}
        size='mini'
      >
        <Modal.Header>Sign In</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <Button type='submit' color='green' onClick={signIn}>
                Sign In
              </Button>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setOpensignin(false)}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>

      {/*Image upload */}
      {user?.displayName ? (<ImageUpload username={user.displayName}/>):(
        <h3>Please Login to Upload Images</h3>
      )}
      
      {/* Header */}
      <div className='app-header'>
        <div className='header-logo'>
          <img
            src='/app-logo.png'
            alt='instagram-clone-logo'
            className='header-logo'
          />
        </div>

        <div className='signup-modal'>
          {user ? (
            <Button size='small' onClick={() => auth.signOut()} color='red'>
              Sign Out
            </Button>
          ) : (
            <div className='auth-buttons'>
              <Button
                color='green'
                size='small'
                onClick={() => setOpensignin(true)}
              >
                Sign In
              </Button>
              <Button
                color='instagram'
                size='small'
                onClick={() => setOpen(true)}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Posts */}

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          image={post.image}
          caption={post.caption}
        />
      ))}

      {/* Posts */}
    </div>
  )
}

export default App
