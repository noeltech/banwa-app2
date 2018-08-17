import React from 'react'
import {AppBar, Toolbar,Typography,Button, IconButton, withStyles} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const styles = (theme) => ({
  box:{
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    // [theme.breakpoints.down('sm')]:{
    //   flexWrap : "nowrap"
    // } 
},
  title:{
    [theme.breakpoints.down(500)]:{
        order: 3,
        alignSelf: "center"
      }
  }
})
  
export default withStyles(styles)(props => 
        <AppBar position="static">
          <Toolbar 
            className={props.classes.box}
            variant = "dense"
          >
            <Typography variant="subheading" color="inherit" >
              Banwa
            </Typography>
            <Typography noWrap variant="title" color="inherit" className={props.classes.title}>
              Iloilo City Population History
            </Typography>
            <Button color="inherit">Maps</Button>
          </Toolbar>
        </AppBar>
)
  