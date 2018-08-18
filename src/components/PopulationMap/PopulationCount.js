import React from 'react'
import {Card, Typography, withStyles, ListItem} from '@material-ui/core'

const styles = () => ({
    countBox : {
        position: "absolute",
        top : 5,
        left: "50%",
        marginLeft: -150,
        padding: [10],
    },
    label : {
        display : "inline-block"  
    },
    count : {
        display : "inline-block",
        paddingLeft : 5,
    
    },
    withMargin: {
        display : "inline-block",
        marginLeft : 20
    }
    
})

const PopulationCount = ({classes,year,totalPopulation}) => (
    <Card className={classes.countBox}>
            <Typography variant="subheading" className={classes.label}>
                POPULATION :   
            </Typography>
            <Typography variant="title" className={classes.count}>
                {(totalPopulation).toLocaleString('en')}
            </Typography>
      
            <Typography variant="subheading" className={classes.withMargin}>
                Year :   
            </Typography>
            <Typography variant="title" className={classes.count}>
                {year}
            </Typography>
    </Card>
)


export default withStyles(styles)(PopulationCount)