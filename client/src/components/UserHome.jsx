import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useLocation } from "react-router-dom";
import "../styles/UserHome.css";
import { useState , useRef, useEffect } from 'react';
import axios from 'axios';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const initialValue = dayjs();


function ServerDay(props) {
  const { daysUserMeet = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && daysUserMeet.indexOf(props.day.date()) >= 0;

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
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMeet, setHasMeet] = useState(false);
  const [daysUserMeet, setDaysUserMeet] = useState([])
  const [meets, setMeets] = useState([])
  const localInput = useRef("");
  const descriptionInput = useRef("");
  const timeInput = useRef("");
  const [meetHilighted, setMeetHighlighted] = useState([]);

  const getMeets = async () => {

    const userId = userData.user;
    const url = `http://localhost:5100/meetuser/${userId}`;
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const correctDay = response.data.map (m => dayjs(m.meet_date).utc().tz('Asia/Tokyo'))
          const newData = response.data.map((m) => {
            return {
              meet_date: dayjs(m.meet_date).utc().tz('Asia/Tokyo'),
              meet_id: m.meet_id,
              meet_description: m.meet_description,
              meet_local: m.meet_local,
              user_id: m.user_id,
              meet_time: m.meet_time,
            }
          })
          setMeets(newData)
          const onlyDays = correctDay.map(days => days.date())
          setDaysUserMeet(onlyDays);
        } else {
          console.log("deu ruim");
        }
    } catch (error) {
        console.error(error);
    }
  
  }


  useEffect(() => {
    const hasMeet = daysUserMeet.filter((dayHas) => dayHas === eventDate.$D);
    const meetInfo = meets.filter((m) => m.meet_date.$D === eventDate.$D)
    if(hasMeet.length === 0) {
      setHasMeet(false);
    } else {
      setHasMeet(true);
      setMeetHighlighted(meetInfo[0]);
      console.log(meetHilighted)

    }
  }, [daysUserMeet, eventDate, meetHilighted, meets]);

  const handleMeet = () => {


  }

  const handleRequest = async (e) => {
    e.preventDefault();
  
    const meetData = {
      user_id: userData.user,
      meet_description: descriptionInput.current.value,
      meet_local: localInput.current.value,
      meet_date: eventDate.format("YYYY/MM/DD"),
      meet_time: `${timeInput.current.value}:00:00`,
    };
  
    const url = "http://localhost:5100/createmeet";
    console.log(meetData.meet_date)
    try {
      const response = await axios.post(url, meetData);
      if (response.status === 200) {
        getMeets();
       setHasMeet(true);
      } else {
        // setAlertOpen(true);
      }
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  const fetchHighlightedDays = async () => {
    const controller = new AbortController();
    getMeets();
    setIsLoading(false);
    requestAbortController.current = controller;
  };

  useEffect(() => {
    getMeets();
    setIsLoading(false);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = () => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setDaysUserMeet([]);
    fetchHighlightedDays();
  };
// console.log(eventDate.$D)
// console.log(hasMeet)
// console.log(daysUserMeet)
// console.log(meets)

  return (

    <div className='container-userhome'>
      <div className="container-title-userhome">
        <h1 className="title-userhome">GymMeet</h1>
      </div>
      <div className="user-card">
        <div className="user-info">
          <h2 className='meet-card' >Hello, {userData.first_name}</h2>
        </div>
        <div className='container-calendar-meets'>
          <div className="meets-info">
             <div className='meets-cards' >Meets for you, {userData.first_name}</div>
             <div className='meets-cards' >Meets for you, {userData.first_name}</div>
             <div className='meets-cards' >Meets for you, {userData.first_name}</div>
          </div>
          <div className="date-calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={initialValue}
                value={eventDate}
                onChange={(newEventDate) => {
                  setEventDate(newEventDate);
                  handleMeet();
                }}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    daysUserMeet,
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
        {hasMeet ? (
          <div>
            <>
            <div className="meet-card">
              <h2 className='meet-card-title'>Your GymMeet for {eventDate.format("MM/DD")}</h2>
              <div className='meet-card-info-in'>
                <p>Description:  {meetHilighted.meet_description}</p>
                <p>Local:  {meetHilighted.meet_local}</p>
                <p>Time:  {meetHilighted.meet_time.substring(0, 5)}</p>
                <p>Who's Attending?</p>
              </div>
            </div>
          </>
          </div>
        ) : (
          <>
            <div className="meet-card">
              <h2 className='meet-card-title'>Let's make a GymMeet for {eventDate.format("MM/DD")}</h2>
              <form className="form-meet" action="#" onSubmit={handleRequest}>
                <div>
                  <label className="label-meet" htmlFor="local">
                    Gym:
                  </label>
                  <input
                    className="input-meet"
                    type="text"
                    name="local"
                    placeholder="Anytime azabu"
                    ref={localInput}
                  />
                </div>
                <div>
                  <label className="label-meet" htmlFor="goals">
                    Hour:
                  </label>
                  <select className="input-meet" name="time" ref={timeInput}>
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
                  <label className="label-meet" htmlFor="description">
                    Description (up to 150 characters):
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe your workout plan for this day..."
                    ref={descriptionInput}
                    maxLength="150"
                    className="large-textarea"
                  ></textarea>
                </div>
                <button className="button-login">Meet!</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
