import { useContext, useState } from "react";
import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import MultipleSelect from "./MultipleSelect";
import { DiagnosesContext } from "../../../DiagnosesContext";
import { Entry, EntryFormValues, HealthCheckRating } from "../../../types";
import useField from "./fieldHooks";

interface NewEntryFormProps{
    id:string;
    entryType: Entry['type'];
    formOpen: boolean;
    evokeNotification: (text: string) => void;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    saveNewEntry: (newEntry: EntryFormValues, id:string) => void;
}


const NewEntryForm = (props: NewEntryFormProps) => {
    const {id, entryType, setFormOpen} = props;
    const {state: [date, setDate], props: dateProps} = useField({label: "Date", type:"date"});
    const {state: [description, setDescription], props: descriptionProps} = useField({label: "Description"});
    const {state: [specialist, setSpecialist], props: specialistProps} = useField({label: "Specialist"});
    const {state: [employerName, setEmployerName], props: employerNameProps} = useField({label: "Employer"});
    const {state: [leaveStartDate, setLeaveStartDate], props: leaveStartDateProps} = useField({label: "start", type: "date"});
    const {state: [leaveEndDate, setLeaveEndDate], props: leaveEndDateProps} = useField({label: "end", type: "date"});
    const {state: [dischargeDate, setDischargeDate], props: dischargeDateProps} = useField({label: "date", type: "date"});
    const {state: [dischargeCriteria, setDischargeCriteria], props: dischargeCriteriaProps} = useField({label: "criteria"});

    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(Number());
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const evokeNotification = props.evokeNotification;
    const diagnoses = useContext(DiagnosesContext);
    const diagnosesCodeLabels = diagnoses.map(d => d.code);

    const onChangeHealthRatingCheck = (rating:string) => {
        console.log(Number(rating), healthCheckRating, (Object.values(HealthCheckRating)));

        if(!isNaN(Number(rating)) && ((Object.values(HealthCheckRating).filter(r => !isNaN(Number(r)) && Number(r)).includes(Number(rating)))|| Number(rating) === 0)){
            setHealthCheckRating(Number(rating));
        }else{
            evokeNotification("Enter Numeric values between 0 and 4 only");
        }
    };

    const resetForm = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setEmployerName('');
        setLeaveStartDate('');
        setLeaveEndDate('');
        setDischargeDate('');
        setDischargeCriteria('');
        setHealthCheckRating(0);
        setDiagnosisCodes([]);
    };
    
    
    const createEntry = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const baseEntry = {description, date, specialist, diagnosisCodes};
        let newEntry: EntryFormValues | undefined = undefined;

        switch(entryType){
            case "HealthCheck":
                newEntry = {...baseEntry, type: entryType, healthCheckRating: healthCheckRating};
                break;
            case "Hospital":
                const discharge = {date:dischargeDate, criteria: dischargeCriteria};
                newEntry = {...baseEntry, type: entryType, discharge };
                break;
            case "OccupationalHealthcare":
                newEntry = {...baseEntry, type: entryType, employerName };
                if((leaveStartDate && !leaveEndDate) || (!leaveStartDate && leaveEndDate)){
                    evokeNotification("Both startDate and endDate required");
                    return;
                }
                if(leaveStartDate && leaveEndDate){
                    newEntry.sickLeave = {
                        startDate: leaveStartDate,
                        endDate: leaveEndDate
                    };
                }
                break;
            default:
                const a: never = entryType;
                a;
                break;
        }
        
        if(!newEntry || newEntry === undefined) {                    
            throw new Error('Entry must have the right values');
        }
        try {
            await props.saveNewEntry(newEntry, id);
            resetForm();
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
            }
        }
        
        
    };

    return (<div>
            <form onSubmit={createEntry} style={{border: '2px dotted', paddingRight: 20, paddingLeft: 10}}>
                <h3>New {entryType} Entry</h3>
                <div>
                    <TextField {...descriptionProps}/>
                </div>
                <div>
                    <TextField {...dateProps}/>
                </div>
                <div>
                    <TextField {...specialistProps} />
                </div>
                {entryType === "HealthCheck" && <div>
                    <TextField 
                        label="Healthcheck rating" 
                        fullWidth 
                        variant="standard" 
                        value={healthCheckRating}
                        onChange={(e) => {
                            onChangeHealthRatingCheck(e.target.value);
                        }}/>
                </div>}

                <div>
                    <MultipleSelect 
                        allValues={diagnosesCodeLabels} 
                        selectedValues={diagnosisCodes} 
                        setSelectedValues={setDiagnosisCodes}/>
                </div>
                {entryType === "OccupationalHealthcare" && 
                <div>
                    <div>
                        <TextField {...employerNameProps} />
                    </div>
                    <Box style={{border: '0px', marginTop: 10}} sx={{ fontFamily: 'default' }}>
                        <div>Sick Leave</div>
                        <Box sx={{p:1}}>
                            <div>
                                <TextField {...leaveStartDateProps} />
                            </div>
                            <div>
                                <TextField {...leaveEndDateProps}/>
                            </div>
                        </Box>
                    </Box>
                </div>
                }

                {entryType === "Hospital" && <Box style={{border: '0px', marginTop: 10}} sx={{ fontFamily: 'default' }}>
                    <div>Discharge</div>
                    <Box sx={{p:1}}>
                        <div>
                            <TextField {...dischargeDateProps} />
                        </div>
                        <div>
                            <TextField {...dischargeCriteriaProps} />
                        </div>
                    </Box>
                </Box>}

                <Box
                    component="span"
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">

                    <Button 
                        variant="contained" 
                        sx={{ my: 1 }} 
                        color="secondary" 
                        onClick={() => {resetForm(); setFormOpen(false);}}>
                        CANCEL
                    </Button>

                    <Button type="submit" variant="contained" sx={{ my: 1 }} color="secondary" >
                        ADD
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default NewEntryForm;