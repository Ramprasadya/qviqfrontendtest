import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PrimaryButton from '../PrimaryButton';
import * as hi from 'react-icons/hi'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function useDefaultProps(props){
    let newProps = {...props};
    Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
    return {...defaultProps,...newProps};
  }
const ConfirmationPopUp = (props) => {props = useDefaultProps(props);

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <Dialog
            PaperProps={{
                style: { borderRadius: 24 }
            }}
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <div className='w-full fixed left-0 bottom-0 bg-white py-6 px-5 md:px-6 rounded-t-2xl md:rounded-full  md:relative'>
                <div className="flex gap-2">
                    <h1 className='text-lg font-semibold'>{props.title}</h1>
                    <span className='ms-auto text-lg pt-1' style={{ cursor: 'pointer' }} onClick={handleClose}><hi.HiOutlineX /></span>
                </div>
                <hr className='text-gray-400 my-6' />
                <p className='text-[#1A1A1A]'>{props.description}</p>
                <div className={`flex ${props.cancelBtn ? 'justify-between' : 'justify-end'} w-full md:justify-end md:gap-2 md:font-semibold mt-8`}>
                    {props.cancelBtn && <button className='px-3 xsm:px-4 py-3 text-[#817c7c] hover:bg-[#F3F3F3] rounded-full' onClick={handleClose}>Cancel</button>}
                    <div className='pt-2 md:pt-0' onClick={handleClose}><PrimaryButton icon='' text={props.buttonText} onClick={props.onClick} /></div>
                </div>
            </div>
        </Dialog>
    );
}

const defaultProps = {
    cancleBtn: true,
}

export default ConfirmationPopUp;