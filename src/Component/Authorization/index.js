import React, { useState } from "react";
import "./home.css";
import picture from "../image/note.png";
import logo from "../image/nihao.png";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FQ from "../FQ";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      flexDirection:'column',
      alignItems: "center",
      textAlign:'center',
      justifyContent: "center",
    },
    paper: {
      
      display: "flex",
      backgroundColor: "white",
      borderRadius: 25,
      overflow:'hidden',
      boxShadow: theme.shadows[5],
      width: "50%",
      height: "70%",
      outline: "none",
    },
  })
);

export default function Authorization() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [recovery,setRecovery]=useState()


  const recoveryPassword = async()=>{
    const req = await fetch(`http://otapi.net/service-json/RequestPasswordRecovery?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=8968acec-5151-49d8-a5d5-07f5efa29a29&userIdentifier=${recovery}`)
    const resp = await req.json() 
    resp.ErrorCode === "Ok"? alert('Дальнейшие шаги будут высланы Вам на почту') : alert('Неверная почта')
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  const Authorization = async () => {
    const url = `http://otapi.net/service-json/Authenticate?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=en&signature=RegisterUser56aa1311-6901-46e7-a0e8-a5445f74986c&timestamp=20210430011102&sessionId=7279d180-2bf7-4368-8433-28ab6b8507e3&userLogin=${login}&userPassword=${password}&rememberMe=true`;
    axios.get(url).then((response) => {
      if (response.data.ErrorCode == "Ok") {
        let token = response.data.SessionId;
        localStorage.setItem("token", token);
        history.push("/");
        window.location.reload();
      } else{
        alert('Неправильный логин или пароль')
      }
    });
  };


  return (
    <div className="homepage__app">
      <div className="homepage__wrap">
      <div id="homepage__wrapper">
      
        <div className="authorization-card">
          <div className="atz-login-card">
            <div className="atz-login-header">
              <p>Вход</p>
            </div>

            <div className="atz-login-form">
              <div className="atz-loginPassword">
                <div className="atzLoginEmail">
                  <h6 className="atzLoginInput">логин*</h6>
                  <input
                    className="atz-form"
                    labelText="Email"
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </div>

                <div className="atzLoginEmail">
                  <h6>пароль*</h6>

                  <input
                    className="atz-form"
                    labelText="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="wrapperThreeElements">
                <div>
                  <p
                    className="atz-forgotPassword"
                    type="button"
                    onClick={handleOpen}
                  >
                    забыли пароль?
                  </p>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <div className={classes.paper}>
                        <div className="pictureCard">
                        <div className="pictureText"><p >Восстановления пароля</p></div>
                          
                         
                        </div>
                        <div className="logoCard">
                        <div className='plusMore' onClick={handleClose} >+</div>
                        <div className='logoCardImgLogo'><img src={logo} /></div>
                        
                          <p>
                            укажите вашу <span>email почту </span> <br />
                            инструкция по <br />
                            восстановлению пароля <br />
                            будет выслана вам почту
                          </p>
                         <div className='logoCardInputAndButton'>

                         <input
                         className='logoCardInput'
                          labelText="Email"
                          type="email"
                          placeholder='       Введите свой e-mail'
                        />
                        <div  className='logoCardInputHover' 
                        onClick={recoveryPassword}>Востановление</div>
                      
                      </div>
                      </div>
                      
                        

                        </div>
                    </Fade>
                  </Modal>
                </div>
                <div className="divEnterLogin">
                  <button className="enterLogin"
                  onClick={Authorization}
                  >войти</button>
                  <Link to="/Registration" style={{ textDecoration: "none" }}>
                    <div className="enterLogin">зарегистрироваться</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <FQ />
        </div>
      </div>
      </div>
    </div>
  );
}