import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as hi from 'react-icons/hi'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = (props) => {

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <div className='w-full fixed left-0 bottom-0 bg-white rounded-t-2xl p-2'>
                <DialogTitle>
                    <div className="flex gap-2">
                        <h1 className='text-lg font-semibold'>{props.title}</h1>
                        <span className='ms-auto text-lg pt-1' onClick={handleClose}><hi.HiOutlineX /></span>
                    </div>
                </DialogTitle>
                <hr className='text-gray-400' />    
                <DialogContent>
                    {props.children}
                </DialogContent>
            </div>
        </Dialog>
    );
}

export default Dialog;