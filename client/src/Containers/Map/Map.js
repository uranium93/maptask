import React, { useState } from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { addLocation } from '../../store/actions/user'
import PureLoading from '../../Components/loading/pureLoading'
import Show from './show'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '64px',
        padding: '5px',
    },
    locations: {
        borderTop: 'solid 2px #30a7fd',
        display: 'flex',
        flexWrap: 'wrap',


    },
    map: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    modal: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        top: '50%',
        left: '75%',
        overflowY: 'auto',
        transform: `translate(-50%,-50%)`,
        width: 400,
        height: '95vh',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[10],
        padding: theme.spacing(2, 4, 4),
        outline: 'none',
        ['@media (max-width:450px)']: { //eslint-disable-line no-useless-computed-key
            width: '85vw',
            left: '50%'
        }
    },
    overflow: {
        overflow: 'auto'
    },
    close: {
        display: 'block',
        position: 'sticky',
        padding: '5px 0',
        bottom: '0',
        width: '100%',
        background: 'white'
    },
}))
const MapBox = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiaGFuYWZpOTMiLCJhIjoiY2p5ZWR1cXVoMDA2azNtcm84ZXFoYXBhbSJ9.9kCN9NB-FNZlI3qWMWfJQQ"
});

const Map = (props) => {
    const classes = useStyles()
    const [discription, setDiscription] = useState('')
    const [name, setName] = useState('')
    const [lngLat, setLngLat] = useState([5.0651462890634775, 36.14912017791592])
    const [modal, openModale] = useState(false)



    const getLngLat = (val) => {
        setLngLat(val)
        console.log(lngLat)
    }

    const addLocationHandler = () => {
        props.addLocation(name, discription, lngLat)
    }
    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item xs={12} md={6} >
                    <h2>My locations </h2>
                    <div className={classes.locations}>
                        {props.user.locations.map((l, i) => {
                            return <Show key={i} location={l} />
                        })}</div>
                </Grid>
                <Grid item xs={12} md={6} className={classes.map}>
                    <MapBox
                        zoom={[6]}
                        center={lngLat} // eslint-disable-next-line 
                        style="mapbox://styles/hanafi93/cjyeg0m2t3xva1cphd892yt22"
                        containerStyle={{
                            height: "350px",
                            width: "100%",
                            position: "relative",
                            marginBottom: "10px"
                        }}>
                        <Layer
                            type="symbol"
                            id="marker"
                            layout={{ "icon-image": "marker-15" }}>
                            <Feature coordinates={lngLat} draggable={true}
                                onDragEnd={(e) => getLngLat(e.lngLat)}
                            />
                        </Layer>
                    </MapBox>
                    <Button color='primary' variant='outlined' onClick={() => openModale(true)}>ADD LOCATION</Button>
                    <Modal open={modal} onClose={() => openModale(false)} closeAfterTransition className={classes.overflow} >
                        <div className={classes.modal}>
                            <TextField
                                id="name"
                                placeholder="Location Name"
                                value={name}
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                id="discription"
                                placeholder="Description"
                                multiline
                                value={discription}
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setDiscription(e.target.value)}
                            />
                            {props.user.locationLoading ? <PureLoading /> :
                                <>
                                    <Button variant="outlined" color="primary" fullWidth
                                        onClick={addLocationHandler.bind()}>ADD</Button>
                                    <div className={classes.close}>
                                        <Button variant="outlined" color="secondary" fullWidth
                                            onClick={() => openModale(false)}>Fermer</Button>
                                    </div>
                                </>}
                        </div>
                    </Modal>


                </Grid>
            </Grid>

        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user,
})
export default connect(mapStateToProps, { addLocation })(Map);