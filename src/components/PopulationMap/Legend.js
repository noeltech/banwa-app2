import React from 'react'
import {Button, Typography, withStyles, List, ListItem, ListItemText,Paper} from '@material-ui/core'
import ViewListIcon from '@material-ui/icons/ViewList';
import ClearIcon from '@material-ui/icons/Clear'
const legend = ['1,000 ','3,000 ','5,000 ','7,000 ','9,000 ','12,000','15,000']
const color = ['#ffffd4', '#fee391', '#fec44f','#fe9929','#ec7014','#cc4c02','#8c2d04']

const styles = (theme) => ({
    box:{
        position: "absolute",
        bottom: 80,
        right:10,
        zIndex: 3,
        
        display:"flex"
        
    },
    legendContainer : {
        padding: 8,
        flexGrow:1,
        
        
    },
    listItem : {
        paddingTop : .5,
        paddingBottom : .5,
        
    },
    button:{
        height: 20
    }
    
})    

const Legend = (props) => (
    <div className={props.classes.box}>
   { innerWidth < 960 &&
    <Button color="primary" 
        variant="contained" size="small" 
        className={props.classes.button}
        onClick = {props.onClick}>
        {props.legendVisibility ?  <ClearIcon/> : <ViewListIcon/>}    
    </Button>
   }
    {props.legendVisibility &&
       
        <Paper className={props.classes.legendContainer}>
            <Typography variant="caption">
                Barangay Population
            </Typography>
            <List  dense={true}>
                {
                legend.map((list ,index ) => {
                return  <ListItem key={index} className={props.classes.listItem}>
                                
                                <ListItemText 
                                primary={list}
                                />
                                <span style={{height:"20px" ,width:"20px", backgroundColor:color[index] }}></span>
                            </ListItem> 
                })
                }
            </List>
        </Paper> 
    }   
  </div>  
 )
    

export default withStyles(styles)(Legend);