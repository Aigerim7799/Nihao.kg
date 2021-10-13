import React, { useState, useEffect } from 'react';
import Profile from './index';
import { useHistory } from 'react-router-dom';
import './ProfileMain.css';
import Modal from './Profile_compon/Modal';
import Modal2 from './Profile_compon/Modal2';
import FQ from '../FQ';

export default function ProfileMain() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [modalActive, setModalActive] = useState(false);
  const [modalActive2, setModalActive2] = useState(false);
  const [fio, setFio] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [surname, setSurname] = useState('');
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [val, setVal] = useState('');
  const [val2, setVal2] = useState('');
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [middlename, setMiddlename] = useState();
  const [info, setInfo] = useState();

  const history = useHistory();
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token == undefined || token == null) {
      history.push('/Authorization');
    }
  }, []);
  const UserToken = localStorage.getItem('token');

  const updateUser = async () => {
    const URL_FULL_INFO = `http://otapi.net/service-json/UpdateUser?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=UpdateUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${UserToken}&userParameters=<UserUpdateData><FirstName>${firstname}</FirstName><LastName>${lastname}</LastName><MiddleName>${middlename}</MiddleName><Password>${password}</Password><Address>${address}</Address><Phone>${phone}</Phone><EnableValidation>false</EnableValidation></UserUpdateData>`;
    const req = await fetch(URL_FULL_INFO);
    const resp = await req.json();
    setInfo(resp);
  };

  const change = async (value, pas, val) => {
    const url = `http://otapi.net/service-json/Change${value}?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=${UserToken}&currentPassword=${pas}&new${value}=${val}`;
    const res = await fetch(url);
    const req = await res.json();
    setData(req);
    if (req.ErrorCode !== 'Ok') {
      alert(req.ErrorDescription);
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="homepage__app">
        <div className="homepage__wrap">
          <div id="homepage__wrapper">
            <Profile
              active={modalActive}
              setActive={setModalActive}
              active2={modalActive2}
              setActive2={setModalActive2}
              fio={fio}
              setFio={setFio}
              address={address}
              setAddress={setAddress}
              email={email}
              setEmail={setEmail}
              number={number}
              setNumber={setNumber}
              password={password}
              setPassword={setPassword}
              surname={surname}
              setSurname={setSurname}
              data={data}
              setValue={setValue}
              setValue2={setValue2}
              value={value}
              value2={value2}
              updateUser={updateUser}
              info={info}
            />
            <FQ />
          </div>
        </div>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        firstname={firstname}
        setFirstname={setFirstname}
        middlename={middlename}
        setMiddlename={setMiddlename}
        lastname={lastname}
        setLastname={setLastname}
        setFio={setFio}
        fio={fio}
        setAddress={setAddress}
        address={address}
        setEmail={setEmail}
        email={email}
        setNumber={setNumber}
        change={change}
        number={number}
        setPassword={setPassword}
        password={password}
        setSurname={setSurname}
        updateUser={updateUser}
        setPhone={setPhone}
      />
      <Modal2
        active2={modalActive2}
        setActive2={setModalActive2}
        surname={surname}
        setSurname={setSurname}
        val={val}
        setVal={setVal}
        val2={val2}
        setVal2={setVal2}
      />
    </div>
  );
}
