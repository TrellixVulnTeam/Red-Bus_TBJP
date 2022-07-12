import axios from 'axios'
import { 
    ADD_BUS_FAILURE,
    ADD_BUS_SUCCESSFULL,
    LOGIN_FAIL,
    LOGIN_SUCCESS ,
    AUTH_ERROR,
    USER_LOADED,
    VIEW_BUS_FAILURE,
    VIEW_BUS_SUCCESSFULLY,
    CREATE_TRIP_SUCCESSFULL,
    CREATE_TRIP_FAILURE,
    VIEW_TRIP_SUCCESSS,
    VIEW_TRIP_FAILURE,
    ADD_ADMIN_SUCCESSFULL,
    ADD_ADMIN_FAILURE,
    PASSWORD_CHANGED_FAILURE,
    PASSWORD_CHANGED_SUCCESSFULLY, 
    GET_TRIP_FAILURE,
    GET_TRIP_SUCCESSS,
    GET_BUS_SUCCESSS,
    GET_BUS_FAILURE,
    GET_BOOKING_SUCCESS,
    GET_BOOKING_FAILURE,
    PROFILE_UPDATED_SUCCESSFULLY,
    PROFILE_UPDATED_ERROR
} from './type'
import setAuthToken from "../utils/setAuthtoken";
const API_URL = "http://localhost:5000/"

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("http://localhost:5000/auth");

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};
export const login = (email, password) => async (dispatch) => {
    console.log(JSON.stringify(email))
    console.log(password)
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email, password })
    try{
        const res = await axios   
            .post(API_URL + 'auth/signin', email,password, config);
        
            dispatch({
                type : LOGIN_SUCCESS, 
                payload : res.data, 
            });
            dispatch(loadUser());   
    }       
    catch(error) {
        dispatch({
            type : LOGIN_FAIL, 
        });
    }
}



export const Addbus_action =
( formData) =>
async (dispatch) => {
	// console.log(id,"kavin")
	console.log("suriya prakash")
    console.log(formData)
	try {
        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // };
        
		const res = await axios.post(
			"http://localhost:5000/bus/addbus" ,
			formData,
		);

		dispatch({
			type: ADD_BUS_SUCCESSFULL,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: ADD_BUS_FAILURE,
			payload:err
		});
	}
};
export const fetchBuses =()=>async(dispatch)=>{
    console.log("suriya")
    try{
        const res=await axios.get("http://localhost:5000/bus/allbus")
        dispatch({
            type:VIEW_BUS_SUCCESSFULLY,
            payload:res.data
        })
        // dispatch(loadUser());
        // console.log(res.data)
        // dispatch(loadUser());
        return res.data
    }
    catch(err){
        console.log(err)
        dispatch({
            type:VIEW_BUS_FAILURE
        })
    }
}



export const Createtrip_action =
( formData) =>
async (dispatch) => {
	// console.log(id,"kavin")
	console.log("suriya prakash")
    console.log(formData)
	try {
        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // };
        
		const res = await axios.post(
			"http://localhost:5000/trip/createtrip" ,
			formData,
		);

		dispatch({
			type: CREATE_TRIP_SUCCESSFULL,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: CREATE_TRIP_FAILURE,
			payload:err
		});
	}
};


export const fetchTrip =()=>async(dispatch)=>{
    console.log("suriya")
    try{
        const res=await axios.get("http://localhost:5000/trip/alltrip")
        dispatch({
            type:VIEW_TRIP_SUCCESSS,
            payload:res.data
        })
        // dispatch(loadUser());
        // console.log(res.data)
        // dispatch(loadUser());
        return res.data
    }
    catch(err){
        console.log(err)
        dispatch({
            type:VIEW_TRIP_FAILURE
        })
    }
}

////

export const Addadmin_action =
( formData) =>
async (dispatch) => {
	// console.log(id,"kavin")
	console.log("suriya prakash")
    console.log(formData)
	try {
        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // };
        
		const res = await axios.post(
			"http://localhost:5000/auth/signup" ,
			formData,
		);

		dispatch({
			type: ADD_ADMIN_SUCCESSFULL,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: ADD_ADMIN_FAILURE,
			payload:err
		});
	}
};


////

export const ChangePassword_action =
( formData) =>
async (dispatch) => {
	// console.log(id,"kavin")
	console.log("suriya prakash")
	try {
		const res = await axios.post(
			`http://localhost:5000/auth/changepassword`,
			formData
		);

		dispatch({
			type: PASSWORD_CHANGED_SUCCESSFULLY,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: PASSWORD_CHANGED_FAILURE,
			payload:err
		});
	}
};

export const getTrip = (formData) => async(dispatch) => {
    console.log("hai")
    try{
        console.log(formData)
        const res = await axios.post("http://localhost:5000/trip/getTrip", formData)
        console.log(res)
        dispatch({
            type : GET_TRIP_SUCCESSS, 
            payload : res.data
        })
    }
    catch(err)
    {
        console.log(err);
        dispatch({
            type : GET_TRIP_FAILURE
        })
    }
}

export const getTripById = (id) => async(dispatch) => {
    console.log("hai")
    try{
        console.log(id)
        const res = await axios.post("http://localhost:5000/trip/getTripById", {'id' : id})
        console.log(res)
        dispatch({
            type : GET_TRIP_SUCCESSS, 
            payload : res.data
        })
    }
    catch(err)
    {
        console.log(err);
        dispatch({
            type : GET_TRIP_FAILURE
        })
    }
}

export const getBusById = (id) => async(dispatch) => {
    try {
        const res = await axios.post("http://localhost:5000/bus/getBusById", {'id' : id})
        console.log(res)
        dispatch({
            type: GET_BUS_SUCCESSS, 
            payload : res.data
        })
    }
    catch(err) {
        console.log(err);
        dispatch({
            type : GET_BUS_FAILURE
        })
    }
}

///

export const getBooking = (id) => async(dispatch) => {
    try {
        console.log("suriya")
        const res = await axios.get(`http://localhost:5000/booking/getbookings/${id}`)
        console.log(res)
        dispatch({
            type: GET_BOOKING_SUCCESS, 
            payload : res.data
        })
    }
    catch(err) {
        console.log(err);
        dispatch({
            type : GET_BOOKING_FAILURE
        })
    }
}

///
export const profile =
	({ name, email, phone }) =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({ name, email, phone });

		try {
			const res = await axios.post(
				"http://localhost:5000/editprofile2",
				body,
				config
			);

			dispatch({
				type: PROFILE_UPDATED_SUCCESSFULLY,
				payload: res.data,
			});

		} catch (err) {

			
            console.log(err)
            

			dispatch({
				type: PROFILE_UPDATED_ERROR,
			});
		}
	};
