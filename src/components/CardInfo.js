import React from 'react'
import { Link } from "react-router-dom";
import axios  from 'axios';

// Date 
import {formatDistanceToNow} from 'date-fns'

// Icon
import {FaMinusCircle, FaTimesCircle} from "react-icons/fa"

// Bootstrap
import { Col, Row, Card } from "react-bootstrap";
import useWorkoutsContext from '../hooks/useWorkoutsContext';
import useAuthContext from '../hooks/useAuthContext';


const CardInfo = ({workout}) => {
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

    const handleOnDelete = async () => {
      if(!user){
        alert("You must logged in")
        return
      }
        try {
          const response = await axios.delete(
            "https://api-gym-app-backend.vercel.app/api/workout/"+workout._id, {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            }
          );
  
          dispatch({type:'DELETE_WORKOUT', payload:response.data})

          alert("Data Deleted Succesfully!");
          
        } catch (error) {
          alert("Deleting Data Failed!");
        }
    }

    const capEach = (sentence) => {
        const words = sentence.split(" ")
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1)            
        }

        const newSentence = words.join(" ")
        return newSentence
    }

  return (
    <div>
        <Card className="mb-2 workoutCard bg-trans mx-auto">
          <Card.Body>
              <Row>
                  <Col>
                      <Card.Title className='green'>{capEach(workout['title'])}</Card.Title>
                      <Card.Subtitle className="mb-2 text-white t-light"><span className='t-bold'>Load (kg) : </span>{workout['load']}</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-white t-light"><span className='t-bold'>Total Reps : </span>{workout['reps']}</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-white t-light">{formatDistanceToNow(new Date(workout['createdAt']), {addSuffix:true})}</Card.Subtitle>
                          
                  </Col>
                  <Col className='col-auto'>
                    <Link to={"/update/"+workout['_id']} state={{w: workout}}>
                      <span className='cur-pointer'><FaMinusCircle className='text-warning text-right'/></span>
                    </Link>
                    <span onClick={handleOnDelete} className='cur-pointer'><FaTimesCircle className='text-danger text-right ms-1' /></span>
                  </Col>
              </Row>
          </Card.Body>
        </Card>

    </div>
  )
}

export default CardInfo
