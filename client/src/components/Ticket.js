import React,{useEffect} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import VerticalTicketRip from '@mui-treasury/components/rip/verticalTicket';
import { useVerticalRipStyles } from '@mui-treasury/styles/rip/vertical';
import { fetchTicket } from '../actions/auth';
import NavBar from './NavBar';
import {connect} from 'react-redux'
const mainColor = '#003399';
const lightColor = '#ecf2ff';
const borderRadius = 12;

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  card: {
    overflow: 'visible',
    background: 'none',
    display: 'flex',
    minWidth: 343,
    minHeight: 150,
    filter: 'drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3))',
    '& $moveLeft, $moveRight': {
      transition: '0.3s',
    },
    '&:hover': {
      '& $moveLeft': {
        transform: 'translateX(-8px)',
      },
      '& $moveRight': {
        transform: 'translateX(8px)',
      },
    },
    [breakpoints.up('sm')]: {
      minWidth: 400,
    },
  },
  left: {
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    flexBasis: '33.33%',
    display: 'flex',
    backgroundColor: '#fff',
  },
  media: {
    margin: 'auto',
    width: 80,
    height: 80,
    borderRadius: '50%',
  },
  right: {
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    flex: 1,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: lightColor,
  },
  label: {
    padding: '0 8px',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 0,
    marginBottom: 4,
  },
  subheader: {
    fontSize: 12,
    margin: 0,
    color: palette.text.secondary,
  },
  path: {
    flex: 1,
    flexBasis: 72,
    padding: '0 4px',
  },
  line: {
    position: 'relative',
    margin: '20px 0 16px',
    borderBottom: '1px dashed rgba(0,0,0,0.38)',
  },
  plane: {
    position: 'absolute',
    display: 'inline-block',
    padding: '0 4px',
    fontSize: 32,
    backgroundColor: lightColor,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
    
  },
  flight: {
    fontSize: 14,
    lineHeight: '24px',
    minWidth: 48,
    padding: '0 8px',
    borderRadius: 40,
    backgroundColor: '#bed0f5',
    color: 'mainColor',
    display: 'block',
  },
  moveLeft: {},
  moveRight: {},
}));

function PlaneTicketCard({ticket,fetchTicket,trip}) {
  const styles = useStyles();
  const ripStyles = useVerticalRipStyles({
    size: 24,
    rightColor: lightColor,
    tearColor: mainColor,
  });

  useEffect(()=>{
        
    fetchTicket()
}, []) 
const day=new Date()

if(ticket){
  console.log(ticket)
  return (
    <div>   
      <div>
      <NavBar />
      </div>
     
      <br /><br /><br /><br/>
      {(ticket.length) === 0 && "No Bookings"}
       {ticket.map((index) => {
         return(
           <div>
       <Card className={styles.card} elevation={0}>
      <div className={cx(styles.left, styles.moveLeft)}>
      <div>
      {index.passengerDetails.map((data) => {
        return(
          <div style={{position:"relative",left:"80px",color:"black",top:"10px", fontFamily: "Times New Roman"}}>
      <p>Name: {data.name}</p>  
      <p>Age: {data.age}</p>
      <p>Gender: {data.gender}</p>
          </div>
      )})}
      </div>
      </div>
      <VerticalTicketRip
        classes={{
          ...ripStyles,
          left: cx(ripStyles.left, styles.moveLeft),
          right: cx(ripStyles.right, styles.moveRight),
        }}
      />
      <div className={cx(styles.right, styles.moveRight)}>
        <div className={styles.label}>
          <h2 className={styles.heading}>{trip["0"].departureLocation}</h2>
          <p className={styles.subheader}>Fare ₹{trip["0"].fare}</p>
        </div>
        <div className={styles.path}>
          <div className={styles.line}>
            <AirportShuttleIcon className={styles.plane} />
          </div>
          <span style={{fontFamily:'cursive'}} className={styles.flight}>
            {/* {index.tripId} */}
            Enjoy Your Journey
          </span><br/>
          <p className={styles.flight} style={{fontFamily:'cursive'}}>No of passenger: {index.passengerDetails.length}</p>
        </div>
        
        <div className={styles.label}>
          <h2 className={styles.heading}>{trip["0"].arrivalLocation}</h2>
          <p className={styles.subheader}>{trip["0"].Trip_date.slice(0,10)}</p><br/>

          <a class="btn btn-primary" href={`/cancelbooking/${index._id}`} role="button">Cancel</a>
          
          {trip.map((find)=>{
            return(
              <div>
            {find._id===index.tripId
            ?(<h1>{find.Trip_date}</h1>):(<></>)}</div>
          )})}
          

          <a class="btn btn-primary" href={`/cancelbooking/${index._id}`} >
            <button style={{
              width:'100%', 
              height : '30px', 
              backgroundColor: mainColor, 
              color:'white', 
              border : 'none', 
              borderRadius : '5px'
            }}>
              Cancel
            </button>
          </a>
        

        </div>
      </div>
  <br/>
   
    </Card> <br/>  </div> 
    )
    })}
    </div>

  );}
  else{
    return (
      <b style={{color:'#e04c54', textAlign:'center'}}>
        <h3>Loading...</h3>
      </b> 
    )
  }
};
const mapStateToProps=state=>{
  return {
      ticket:state.booking.booking.data,
      trip:state.booking.booking.trip
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    fetchTicket:()=>dispatch(fetchTicket()),
  

  }}

export default connect(mapStateToProps,mapDispatchToProps)(PlaneTicketCard);
