import React from 'react';
import {withStyles,Hidden,withWidth,Button} from '@material-ui/core';
import BarangayInfo from './BarangayInfo'
import compose from 'recompose/compose'


const styles = () => ({
    box: {
        position: "absolute",
        top : 58,
        left : "1%",
        width : 220,
        height: "75%",
        overflow : "auto",

    }
})

const ChartBox = ({classes,highChartLimit, lowChartLimit, highPopulation, lowPopulation}) => (
  <div className={classes.box}>
    <Hidden only={["sm",'xs']}>
        <div >
            <BarangayInfo title ="Barangays With Highest Population" 
                chartLimit = {highChartLimit} 
                population={highPopulation}/>
            <BarangayInfo title="Barangays With lowest Population" 
                chartLimit = {lowChartLimit} 
                population={lowPopulation}/>
        </div>  
  </Hidden>
  <Hidden only={["lg",'md',"xl"]}>
  <Button variant="contained" className={classes.button}>
        >>
      </Button>
  </Hidden>
  </div>
)


export default compose(
    withStyles(styles),
    withWidth(),
  )(ChartBox);