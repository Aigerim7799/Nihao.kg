import React,{useState} from 'react';
import './Do.css';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from './doComponents/List';
import Anket from './doComponents/Anket';
import Delivery from './doComponents/Delivery';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
    marginBottom: '10px',
  },
  button: {
    width: '100px',
  },
  instructions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  div: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function getSteps() {
  return ['Оформление заказа', 'Доставка', 'Оплата'];
}

function getStepContent(step,setElId,setTruth,truth,setWeight,weight,setUserId,setComment,order) {
  switch (step) {
    case 0:
      return <List setElId={setElId}  setWeight={setWeight} weight={weight} />;
    case 1:
      return <Delivery setTruth={setTruth} userId={setUserId} comment={setComment} />;
    case 2:
      return <Anket order={order} />;
    default:
      return 'Unknown step';
  }
}



function DoOrder() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [elId,setElId]=useState()
  const [ truth,setTruth]=useState()
  const [ weight,setWeight]=useState(1)
  const [ userId,setUserId]=useState()
  const [ comment,setComment]=useState()
  const [ order,setOrder]=useState()

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const getIds=()=>{
  }
  const token = localStorage.getItem('token')
  const addOrder = async(weight,id,deliveryModeId,comment,userProfileId)=>{
    const url=`http://otapi.net/service-json/CreateOrder?instanceKey=56aa1311-6901-46e7-a0e8-a5445f74986c&language=ru&signature=GetCategorySubcategoryInfoList56aa1311-6901-46e7-a0e8-a5445f74986cru20210430011102123123&timestamp=20210430011102&sessionId=${token}&xmlCreateData=<OrderCreateData><Weight>${weight}</Weight><Elements>${id}</Elements><DeliveryModeId>${deliveryModeId}</DeliveryModeId><Comment>${comment}</Comment><UserProfileId>${userProfileId}</UserProfileId></OrderCreateData>`
    const req = await fetch(url)
    const res= await req.json()
    setOrder(res)
  }
  return (
    <div className="homepage__app">
      <div className="homepage__wrap">
        <div id="homepage__wrapper">
          <div className="Do__wrap">
            <div className="Do__line">
              <p>Завершить заказ</p>
            </div>
            <div className="Do__content">
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = <Typography variant="caption"></Typography>;
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              <div>
                {activeStep === steps.length ? (
                  <div className={classes.div}>
                    <Typography className={classes.instructions}></Typography>
                    <div
                      style={{
                        width: '100%',
                        height: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                      }}>
                      <p className="animationP">Готово!</p>
                      <p className="animationP">Нажмите логотип чтобы вернуться в главное меню</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep,setElId,setTruth,truth,setWeight,weight,setUserId,setComment,order)}
                    </Typography>
                    <div className={classes.buttons}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}>
                        Назад
                      </Button>

                      {/* <Button variant="contained" onClick={()=>{handleNext();
                      activeStep===steps.length-1?addOrder(weight,elId,truth,comment,userId):
                        activeStep===steps.lenght-0? null :getIds()
                       }} className={classes.button}>
                        {activeStep === steps.length - 1
                          ? 'Готово'
                          : activeStep === steps.length - 2
                          ? 'Оформить'
                          : 'Далее'}
                      </Button> */}

                      { activeStep === steps.length - 1 ? 
                        <Button className={classes.button} 
                        onClick={()=>handleNext()} > 
                          Готово
                        </Button>
                        :  activeStep === steps.length - 2? 
                        <Button className={classes.button} onClick={()=>{handleNext()
                        addOrder(weight,elId,truth,comment,userId)}
                        }> 
                          Оформить
                        </Button>
                        : <Button className={classes.button} onClick={()=>handleNext()}> 
                            Далее
                        </Button>
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoOrder;
