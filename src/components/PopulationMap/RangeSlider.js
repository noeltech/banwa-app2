import React from 'react';
import Slider from '@material-ui/lab/Slider';
import { withStyles,Card, Tabs,Tab, withWidth} from '@material-ui/core'
import compose from 'recompose/compose'

const styles = (theme) => ({
  sliderContainer : {
    width: 600,
    position: "absolute",
    bottom: 15,
    zIndex: 3,
    left:"50%",
    marginLeft:-300,
    [theme.breakpoints.down("xs")]:{
      width: "100%",
      bottom: 0,
      position: "relative",
      left:"0%",
      marginLeft:0,
      
    }
  },
  tab : {
    minWidth : 50,
    minHeight: 30,
    [theme.breakpoints.down("xs")]:{
      minWidth : 30,
    }
  },
  tabs : {
    minHeight: 30
  },
  slider: {
    width: "90%",
    margin : "auto",
    paddingBottom : 3,
    paddingTop : 20
  }
})

const  sliderValue = ['1970','1975', '1980', '1990','1995','2000','2007','2010','2015'];

const RangeSlider = (props) =>  (
        
      <Card className={props.classes.sliderContainer}>
          {console.log("RangerSlider Render")}
          <Slider className={props.classes.slider} value={props.currentValue} min={0} max={8} step={1} 
            onChange={(event,value) => {
              props.onSliderChange(value)
              props.populationSwitch(value)
            }} 
          />
          <Tabs
            className={props.classes.tabs}
            value={props.currentValue}
            onChange={(event, value) => {
                props.onSliderChange(value)
                props.populationSwitch(value)
            }}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            >
            {sliderValue.map((label, index)=>{
              return <Tab key={index} className ={props.classes.tab} label={label} />
            })}
          </Tabs>
      </Card>
)


export default compose(
  withStyles(styles),
  withWidth(),
)(RangeSlider);

// 