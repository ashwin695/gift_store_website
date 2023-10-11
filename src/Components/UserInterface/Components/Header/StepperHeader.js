import React from 'react';
import useStyles from './StepperHeaderCss';
import { Grid, Box } from '@mui/material';
import { AppBar, Toolbar, Stepper, Step, StepLabel } from '@mui/material';
import logo from "../../../Assets/Images/logo.png"
import { useNavigate } from 'react-router-dom';

export default function StepperHeader() {
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(1);
    const [skipped, setSkipped] = React.useState(new Set());

    var navigate = useNavigate()

    const steps = ['ADD PRODUCTS IN BAG', 'ADD ADDRESS', 'PAYMENT'];

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    function showStepper() {
        return (
            <Box sx={{ width: 700 }}>
                <style jsx>
                    {`
                        .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed{
                            color: #e52c86 !important
                        }
                        .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active{
                            color: #e52c86 !important
                        }
                    `} {/* color: #fc2779 */}
                </style>
                <Stepper activeStep={activeStep}>
                    {
                        steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })
                    }
                </Stepper>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, marginBottom:20 }}>
            <AppBar style={{ backgroundColor: '#fff' }} position="fixed">
                <Toolbar>
                    <Grid container spacing={1}>
                        <Grid item xs={3} className={classes.center}>
                            <img 
                                src={logo}
                                width="30%"
                                style={{ padding:10 }}
                                onClick={()=>navigate(`/`)}
                            >
                            </img>
                        </Grid>

                        <Grid item xs={7} className={classes.center}>
                            {showStepper()}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}