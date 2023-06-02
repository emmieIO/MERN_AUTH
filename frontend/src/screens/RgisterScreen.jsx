import { useState,useEffect } from 'react'
import { Form,Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import {  useSignupMutation } from '../slices/usersApiSlice'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/loader'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'


const RegisterScreen = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [name,setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signup,{isLoading}] = useSignupMutation();
    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo])

    const submitHandler = async(e)=>{
        e.preventDefault()
        if (password !== confirmPassword){
        toast.error('Passwords do not match');
        }else{

            try {
                const res = await signup({name,email,password}).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate('/')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
          
        }
    }
  return (
    <>
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                type="text"
                placeholder='Enter Name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                 ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                type="email"
                placeholder='Enter email address'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                 ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="Password"
                placeholder='Enter Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                 ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                type="Password"
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                 ></Form.Control>
            </Form.Group>


            <Button type='submit' variant='primary' className='my-3'><span>{isLoading && <Loader/>}</span> Register</Button>
            <Row className="py-3">
                <Col>
                Registered already? <Link to='/Login'>Sign in</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
    </>
  )
}

export default RegisterScreen