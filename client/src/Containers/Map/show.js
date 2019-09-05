import React, { useState } from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles(theme => ({
    modal: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        top: '50%',
        left: '25%',
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
const Show = (props) => {
    const [modal, openModal] = useState(false)
    const locations = props.location
    const classes = useStyles()
    return (
        <div>
            <Button color='primary' variant='text' onClick={() => openModal(true)}>{locations.name}</Button>
            <Modal open={modal} onClose={() => openModal(false)} closeAfterTransition className={classes.overflow} >
                <div className={classes.modal}>
                    <MapBox
                        zoom={[6]}
                        center={locations.location} // eslint-disable-next-line 
                        style="mapbox://styles/hanafi93/cjyeg0m2t3xva1cphd892yt22"
                        containerStyle={{
                            height: "350px",
                            width: "100%",
                            position: "relative",
                        }}>
                        <Layer
                            type="symbol"
                            id="marker"
                            layout={{ "icon-image": "marker-15" }}>
                            <Feature coordinates={locations.location}
                            />
                        </Layer>
                    </MapBox>
                    <h2>{locations.name}</h2>
                    <h3>{locations.discription}</h3>
                    <Button variant="outlined" color="secondary" fullWidth
                        onClick={() => openModal(false)}>Fermer</Button>
                </div>
            </Modal>

        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user
})
export default connect()(Show);