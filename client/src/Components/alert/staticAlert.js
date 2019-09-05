import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

class DirectionSnackbar extends React.Component {
    state = {
        open: false,
    };



    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidUpdate() {
        if (!this.state.open) {
            this.setState({ open: true, transition: TransitionRight });
        }

    }
    componentDidMount() {
        this.setState({ open: true, transition: TransitionRight });
    }

    render() {
        return (
            <div>

                <Snackbar
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={this.state.transition}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.props.msg}</span>}
                />
            </div>
        );
    }
}

export default DirectionSnackbar;