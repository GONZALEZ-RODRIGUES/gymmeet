import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "../styles/UserHome.css";
import { useState , useRef } from 'react';
import axios from 'axios';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 * 
 */
function fakeFetch(date, { signal }) {

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));
      
      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs();


function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🟢' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const [eventDate, setEventDate] = useState(dayjs());
  const location = useLocation();
  const userData = location.state;
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [meetHas, setMeetHas] = useState(false);

  let daysUserMeet = [];
  const localInput = useRef("");
  const descriptionInput = useRef("");
  const timeInput = useRef("");

  const getMeets = async () => {

    const userId = userData.user;
    const url = `http://localhost:5100/meetuser/${userId}`;
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const correctDay = response.data.map (m => dayjs(m.meet_date).utc().tz('Asia/Tokyo'))
          daysUserMeet = correctDay.map(days => days.date())
          console.log(daysUserMeet)
            setHighlightedDays(daysUserMeet)
        } else {
          console.log("deu ruim");
        }
    } catch (error) {
        console.error(error);
    }
  
  }

  const handleRequest = async (e) => {
    e.preventDefault();
  
    const meetData = {
      user_id: userData.user,
      meet_description: descriptionInput.current.value,
      meet_local: localInput.current.value,
      meet_date: eventDate.format(),
      meet_time: `${timeInput.current.value}:00:00`,
    };
  
    const url = "http://localhost:5100/createmeet";
  
    try {
      console.log(meetData.meet_date)
      const response = await axios.post(url, meetData);
      if (response.status === 200) {
        getMeets();
       setMeetHas(true);
      } else {
        // setAlertOpen(true);
      }
    } catch (error) {
      console.error("Error: " + error);
    }
  };


  const fetchHighlightedDays = async (date) => {
    const controller = new AbortController();
    const daysWithMeet = await getMeets();
    console.log(daysWithMeet)
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        console.log(daysToHighlight)
        //setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (

    <div className='container-userhome'>
    <div className="container-title-userhome">
        <h1 className="title-userhome">GymMeet</h1>
     </div>
    <Box className="user-card" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                  <Grid  item xs={12}>
                      <Item >Hello, {userData.first_name}</Item>
                  </Grid>
                  <Grid  item xs={8}>
                      <Item >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
              defaultValue={initialValue}
              value={eventDate}
              onChange={(newEventDate) => setEventDate(newEventDate)}
              loading={isLoading}
              onMonthChange={handleMonthChange}
              renderLoading={() => <DayCalendarSkeleton />}
              slots={{
                  day: ServerDay,
              }}
              slotProps={{
                  day: {
                      highlightedDays,
                  },
              }} />
      </LocalizationProvider>

                      </Item>
                  </Grid>
                  <Grid item xs={4}>
                      <Item >Meets for you, {userData.first_name}</Item>
                      <Item >Meets for you, {userData.first_name}</Item>
                      <Item >Meets for you, {userData.first_name}</Item>
                  </Grid>
                  <Grid item xs={12}>
                      <Item >Lets make a GymMeet for {eventDate.format("MM/DD")}
                      <br></br>
                      <form className="form-meet" action="#" onSubmit={handleRequest}>
                        <div>
                        <label className="label-register" htmlFor="local">
                              Gym:
                            </label>
                            <input
                              className="input-login"
                              type="text"
                              name="local"
                              placeholder="Anytime azabu"
                              ref={localInput}
                            />
                        </div>
 
                            <div>
                            <label className="label-register" htmlFor="goals">
                              Hour:
                            </label>
                            <select  className="input-login" name="time" ref={timeInput}>
                              <option value="00">00:00</option>
                              <option value="01">01:00</option>
                              <option value="02">02:00</option>
                              <option value="03">03:00</option>
                              <option value="04">04:00</option>
                              <option value="05">05:00</option>
                              <option value="06">06:00</option>
                              <option value="07">07:00</option>
                              <option value="08">09:00</option>
                              <option value="09">09:00</option>
                              <option value="10">10:00</option>
                              <option value="11">11:00</option>
                              <option value="12">12:00</option>
                              <option value="13">13:00</option>
                              <option value="14">14:00</option>
                              <option value="15">15:00</option>
                              <option value="16">16:00</option>
                              <option value="17">17:00</option>
                              <option value="18">18:00</option>
                              <option value="19">19:00</option>
                              <option value="20">20:00</option>
                              <option value="21">21:00</option>
                              <option value="22">22:00</option>
                              <option value="23">23:00</option>
                            </select>
                            </div>
                            <div>
                            <label className="label-register" htmlFor="description">
                              Description (up to 150 characters):
                            </label>
                            <textarea
                              // className="input-login"
                              name="description"
                              placeholder="Describe your workout plan for this day..."
                              ref={descriptionInput}
                              maxLength="150"
                            ></textarea>
                            </div>
                            <button className="button-login">Meet!</button>
                          </form>
                      </Item>
                  </Grid>
              </Grid>
          </Box>
          
    </div>
  );
}
