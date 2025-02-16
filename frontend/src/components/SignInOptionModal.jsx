import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';
import toastAlert from '../utils/alert';
import axiosInstance from '../utils/axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function SigninOptionModal({ open, setOpen }) {

    const [signinLoader, setSigninLoader] = useState(false);
    const [signinType, setSigninType] = useState(null);
    const {setIsUserAuthenticated} = useContext(AuthContext);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const signinAsUser = async (type) => {
        try {
            setSigninLoader(true);
            setSigninType(type);
            if (type === "user") {
                const response = await axiosInstance.post("/v1/user/signin");
                if (response?.status === 200) {
                    console.log(response);
                    localStorage.setItem("token", response?.data?.data?.token);
                    localStorage.setItem("address", response?.data?.data?.address);
                    setIsUserAuthenticated(response?.data?.data);
                    toastAlert("success", "Signin Success.");
                    handleClose();
                } else {
                    throw "Can't signin.";
                }
            }
            else if (type === "worker") {
                const response = await axiosInstance.post("/v1/worker/signin");
                if (response?.status === 200) {
                    console.log(response)
                    localStorage.setItem("token", response?.data?.data?.token);
                    localStorage.setItem("address", response?.data?.data?.address);
                    setIsUserAuthenticated(response?.data?.data);
                    toastAlert("success", "Signin Success.");
                    handleClose();
                } else {
                    throw "Can't signin.";
                }
            }
        }
        catch (error) {
            toastAlert("error", error?.message || "Something Went Wrong.")
            console.log(error?.message);
        }
        finally {
            setSigninLoader(false);
        }
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Continue As
            </DialogTitle>
            {/* <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                Close
            </IconButton> */}
            <DialogContent dividers>
                {/* <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </Typography> */}

                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    {
                        signinLoader ?
                            <>
                                <div className='flex flex-col justify-center items-center p-4 rounded-2xl hover:bg-indigo-200 cursor-pointer'>
                                    {
                                        signinType === "user" ?
                                            <PersonIcon sx={{ fontSize: 160, color: "blue" }} />
                                            :
                                            <EngineeringIcon sx={{ fontSize: 160, color: "blue" }} />
                                    }
                                    <p>Signing in as {signinType}, Please Wait</p>
                                </div>
                            </>
                            :
                            <>
                                <div onClick={() => signinAsUser("user")} className='flex flex-col justify-center items-center p-4 rounded-2xl hover:bg-indigo-200 cursor-pointer'>
                                    <PersonIcon sx={{ fontSize: 160, color: "blue" }} />
                                    <p>As User</p>
                                </div>
                                <div onClick={() => signinAsUser("worker")} className='flex flex-col justify-center items-center p-4 rounded-2xl hover:bg-indigo-200 cursor-pointer'>
                                    <EngineeringIcon sx={{ fontSize: 160, color: "blue" }} />
                                    <p>As Worker</p>
                                </div>
                            </>
                    }
                </Box>




            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}