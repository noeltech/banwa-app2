import React from 'react'
import {Card, Typography, withStyles, List, ListItem, ListItemText,Paper} from '@material-ui/core'

const legend = ['1,000 ','3,000 ','5,000 ','7,000 ','9,000 ','12,000','15,000']
const color = ['#ffffd4', '#fee391', '#fec44f','#fe9929','#ec7014','#cc4c02','#8c2d04']

const styles = (theme) => ({
    legendContainer : {
        position: "absolute",
        bottom: 50,
        right:10,
        zIndex: 3,
        flexGrow:1,
        padding: 8,
        
        
        
    },
    listItem : {
        paddingTop : .5,
        paddingBottom : .5,
        
    }
    
})    

const Legend = (props) => (
    <Paper className={props.classes.legendContainer}>
        <Typography variant="body2">
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
 )
    

export default withStyles(styles)(Legend);