import { useParams } from "react-router-dom";
import { Entry, EntryFormValues, Gender, Patient } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from "@mui/icons-material/Male";
import { Alert } from "@mui/material";
import axios from "axios";
import EntryDetails from "./EntryDetails";
import EntryTypeDialog from "./EntryTypeDialog";
import NewEntryForm from "./NewEntryForm";

interface GenderIconProps {
    gender: Gender;
}

const GenderIcon = (props: GenderIconProps) => {
    const gender = props.gender;
    const genderMap = {
        female: <FemaleIcon/>,
        male: <MaleIcon/>
    };
    if(gender === "male") return genderMap.male;
    if(gender === "female") return genderMap.female;
    
};

const IndividualPatientPage = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient | null>(null);
    const [entryType, setEntryType ] = useState<Entry['type']>("HealthCheck");
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const getPatient = async () => {
            if(id){
                const p = await patientService.findById(id);
                setPatient(p);
            }  
        };
        getPatient();
    }, [id]);

    const saveNewEntry = async (newEntry: EntryFormValues, id:string) => {
        try {
            const entry = await patientService.addNewEntry(newEntry, id);
            if(patient){
                setPatient({...patient, entries: patient.entries.concat(entry)});
            }
        } catch (error:unknown) {
            if(axios.isAxiosError(error)){
                evokeNotification(error.response?.data);
                throw new Error("Failed");
            }
        }
    };

    const evokeNotification = (text:string) => {
        setErrorMessage(text);
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    };

    if(!patient) return <div>Patient Not found</div>;
    return (
        <div>
            <h2>{patient.name} <GenderIcon gender={patient.gender}/></h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {formOpen && <NewEntryForm id={patient.id} {...{entryType, formOpen, setFormOpen, saveNewEntry, evokeNotification}} />}
            <div>
                <h2>entries</h2>
                <div>
                    {patient.entries.map((entry) => {
                        return (<EntryDetails key={entry.id} entry={entry}/>);
                    })}
                </div>
                <EntryTypeDialog {...{entryType, setEntryType, formOpen, setFormOpen}} />
            </div>
        </div>
    );
};

export default IndividualPatientPage;