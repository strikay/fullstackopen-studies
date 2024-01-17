
import { Diagnosis, Entry, HealthCheckRating } from "../../types";
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext } from "react";
import { DiagnosesContext } from "../../DiagnosesContext";

const getDiagnosisName = (code: Diagnosis['code'], diagnoses: Diagnosis[]): Diagnosis['name'] | null => {
    
    const diagnosis = (diagnoses.find(d => {
        return d.code === code;
    }));
    if(!diagnosis) return null;

    return diagnosis.name;
};

const BaseEntryContainer = (props: {entry: Entry, employerName:string|null; entryIcon: JSX.Element; children:JSX.Element}) => {
    let key = 0;
    const diagnoses = useContext(DiagnosesContext);
    return (
        <div style={{border: '1px solid', padding: 5, borderRadius:5, margin: 5 }}>
        <div>{props.entry.date} {props.entryIcon} {props.employerName}</div>
        <div><i>{props.entry.description}</i></div>
        <ul>
            {props.entry.diagnosisCodes?.map(code => {
                return (
                    <li key={key++}>{code} {getDiagnosisName(code, diagnoses)}</li>
                );
                }
            )}
        </ul>
        <div>{props.children}</div>
        <div>Diagnosed by: {props.entry.specialist}</div>
    </div>
    );
};

const HospitalEntryDetails = (props: {entry: Entry}) => {
    const entry = props.entry;
    return (
            <BaseEntryContainer 
                entry={entry} 
                employerName={null} 
                entryIcon={<LocalHospitalIcon/>}>
                <></>
            </BaseEntryContainer>
    );
};

const OcupationalHealthCareEntryDetails = (props: {entry: Entry, employer: string}) => {
    const entry = props.entry;
    return (
            <BaseEntryContainer 
                entry={entry} 
                employerName={props.employer} 
                entryIcon={<WorkIcon/>}>
                <></>
            </BaseEntryContainer>
    );
};

const HealthCheckEntryDetails = (props: {entry: Entry, healthCheckRating:HealthCheckRating}) => {
    const entry = props.entry;
    let healthIconColor;
    switch (props.healthCheckRating) {
        case 0:
            healthIconColor = 'green';
            break;
        case 1:
            healthIconColor = 'yellow';
            break;
        case 2:
            healthIconColor = 'orange';
            break;
        case 3:
            healthIconColor = 'red';
            break;
        default:
            break;
    }
    return (
            <BaseEntryContainer 
                entry={entry} 
                employerName={null} 
                entryIcon={<MedicalServicesIcon/>}>
                    <FavoriteIcon style={{color:healthIconColor}}/>
            </BaseEntryContainer>
    );
};

const EntryDetails = (props:{entry: Entry}) => {
    const entry = props.entry;
    const baseProps = {entry};

    switch(entry.type){
        case "Hospital":
            return <HospitalEntryDetails {...baseProps}/>;
        case "OccupationalHealthcare":
            return <OcupationalHealthCareEntryDetails {...baseProps} employer={entry.employerName}/>;
        case "HealthCheck":
            return <HealthCheckEntryDetails {...baseProps} healthCheckRating={entry.healthCheckRating}/>;
        default:
            const a:never = entry;
            a;
            break;
    }
};

export default EntryDetails;