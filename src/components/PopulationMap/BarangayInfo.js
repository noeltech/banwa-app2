import React from 'react';
// import {BarChart, Bar, XAxis, YAxis, Tooltip, LabelList} from 'recharts'
import {Card, List, Typography, ListItem, withStyles} from '@material-ui/core'


const percentValue = ( x, highestPop) => `${Math.round(( x / highestPop)*100)}%`

const styles = () => ({
    box: {
        padding: 10,
        marginBottom : 8,
        width: 220,
        marginRight: 5,
    },
    InsideBox : {
        display : "flex",
        justifyContent: "space-between"
    }
})

const Chart = (props) => (
    <Card className={props.classes.box}>
        <Typography variant="body2" align="center">{props.title}</Typography>
        {    
            props.population.map((data, index)=> { 
                return <div key={index} >
                            <div className={props.classes.InsideBox}>
                                <Typography > {data.barangayName} </Typography>   
                                <Typography  > {data.population}</Typography>
                            </div>
                            <div>
                                <svg key ={index} width="100%" height="10" >
                                    <rect width="100%" height="10" fill="#ccc"  rx="1" ry="1"></rect>
                                    <rect width={percentValue(data.population, props.chartLimit)} height="10" fill='#fe9929' rx="1" ry="1">
                                    <animate 
                                        attributeName="width" 
                                        from="0" 
                                        to={percentValue(data.population, props.chartLimit)}
                                        dur="300ms"
                                        />
                                    </rect>
                                </svg>
                            </div>
                        </div>
            
        })}
           
    </Card>  
)

export default withStyles(styles)(Chart);