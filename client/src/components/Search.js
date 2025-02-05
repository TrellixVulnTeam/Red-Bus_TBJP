import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import {connect, useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { IoSwapHorizontal } from 'react-icons/io5';
import { getTrip} from "../actions/auth";
import { GET_TRIP_FAILURE, GET_TRIP_SUCCESSS } from '../actions/type'
import { makeStyles } from '@material-ui/core' 
const useStyles = makeStyles((theme) => ({
    box : {
        width: '70%', 
        border : 'none',
        margin : '0 auto'
    }, 
    boxValue : {
        borderBottom : '1px solid #D3D3D3',
        paddingLeft : '10px',
        margin:'0 auto', 
        width : '70%'
    }, 
}));

function Search ({trip, getTrip}) {
    const classes = useStyles();
    const val = useParams();
    const [formData, setFormData] = useState({
        source : val.id1, 
        destination : val.id2, 
        date : val.id3
    })

    const dispatch = useDispatch();

    const handleViewSeat = async (e) => {
        e.preventDefault();
        const value = e.currentTarget.id
       console.log(e.currentTarget.id); 

        try{
            const res = await axios.post("http://localhost:5000/trip/getTripById", {'id' : e.currentTarget.id})
            console.log(res.data.data.busId)
            console.log(value)
            window.location.href =`http://localhost:3000/searchTrip/viewSeats/${res.data.data.busId}/${value}`
        }
        catch(err)
        {
            console.log(err);
        }
    }
    
    useEffect(()=>{
        console.log(formData)
        getTrip(formData)
    }, []) 

    console.log(trip)
    if(trip) {
        return (
            <div>
                <div
                    style={{
                        width:'1070px',
                        height : '100px',
                        margin: '0 auto',
                        backgroundColor: 'white', 
                        border: 'none',
                        borderRadius : '10px'
                    }}
                >

                <input 
                    style={{
                        fontSize: '20px',
                        textAlign: 'center',
                        width:'315px',
                        height : '80px', 
                        border : 'none',
                        fontFamily: 'Courier New, Courier, monospace', 
                        fontWeight: "bold", 
                    }}
                    type="text"
                    value = {formData.source}
                    disabled= {true}
                />  

                <IoSwapHorizontal style={{fontSize: '30px', paddingLeft: '20px', paddingRight:'20px'}}/>

                <input 
                    style={{
                        fontSize: '20px',
                        textAlign: 'center',
                        width:'315px',
                        height : '80px', 
                        border : 'none',
                        fontFamily: 'Courier New, Courier, monospace', 
                        fontWeight: "bold", 
                    }}
                    type="text"
                    value = {formData.destination}
                    disabled= {true}
                />
                <span style={{paddingLeft: '20px'}}></span>
                <input 
                    style={{
                        fontSize: '20px',
                        textAlign: 'center',
                        width:'315px',
                        height : '80px', 
                        border : 'none',
                        fontFamily: 'Courier New, Courier, monospace', 
                        fontWeight: "bold", 
                        paddingLeft: '20px'
                    }}
                    type="date"
                    value = {formData.date}
                    disabled= {true}
                />  
                
                </div>

                <br />
                   {(trip.length !== 0) ? 
                   
                    (
                   <div>
                        {trip.map((index) => {
                                console.log(index._id)
                                return (
                                    <div key = {index._id} >
                                        <table className={classes.box}>
                                        <div className={classes.boxValue} >
                                            <td style={{width:'50%'}}>
                                                    <div className={classes.col1} style={{float:'left', fontSize: '18px'}} >
                                                        {/* <h3>Operator Name : {index.operatorName}</h3> */}
                                                        <p>
                                                            Trip Date : {index.Trip_date.slice(0,10)}<br />
                                                            Departure Time : {index.departureTime}<br />
                                                            Duration : {index.duration}hr<br /><br />
                                                            <b style={{color: '#e04c54'}}>Fare : ₹{index.fare}</b><br/>
                                                        </p>
                                                    </div>
                                                    <div className={classes.col2} style={{float:'right', width:'28%', paddingTop:'30px', paddingRight : '100px'}}>
                                                        <button id={index._id} style={{
                                                            width : '200px', 
                                                            height: '50px', 
                                                            backgroundColor : '#e04c54', 
                                                            color : 'white', 
                                                            border : 'none', 
                                                            borderRadius : '5px', 
                                                            fontSize: '18px'
                                                        }} onClick={handleViewSeat}>
                                                            View Seats
                                                        </button><br /><br />
                                                        <span style={{fontSize:'15px', textAlign:'center', padding:'20px'}}><b>Available Seats : {index.availableSeats.length}</b></span>
                                                    </div>
                                            </td>
                                            </div>
                                        </table>
                                    </div>
                                )  
                            }) 
                        }
                    </div>  )
                    : (((trip.length === 0) 
                            ? 
                                (<div style={{textALign:'center', width:'10%', color:'#e04c54', margin:'0 auto'}}><h3>NO RESULTS</h3></div>) 
                            : 
                                (<></>)))}
                   
            </div>
        )
    }
    else{
        return (
            <div>
                <b style={{color:'#e04c54', textAlign:'center'}}>
                    <h3>Loading</h3>
                </b>  
            </div>
        )
    }
}

// export default Search
const mapStateToProps=state=>{
    return {
        trip:state.trip.trip.data
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
      getTrip:(formData)=>dispatch(getTrip(formData)),
  
    }}
  export default connect(mapStateToProps,mapDispatchToProps)(Search)
