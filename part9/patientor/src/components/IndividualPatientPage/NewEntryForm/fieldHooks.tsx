import { InputLabelProps } from "@mui/material";
import { useState } from "react";

interface FieldParams{
    label:string, 
    type?:React.HTMLInputTypeAttribute, 
}

interface FieldReturns{
    state: [string, React.Dispatch<React.SetStateAction<string>>];
    props:{
        label:string;
        type?:React.HTMLInputTypeAttribute;
        fullWidth:boolean;
        variant:"standard";
        value:string;
        onChange: React.ChangeEventHandler<HTMLInputElement>, 
        InputLabelProps?: Partial<InputLabelProps>;
    };
}

const useField = (params: FieldParams): FieldReturns => {
    const label = params.label;
    const [value, onChange] = useState<string>('');

    const fieldProps:FieldReturns =  {
        state: [value, onChange],
        props: {
            label, 
            fullWidth:true, 
            variant:"standard", 
            value, 
            onChange: (e) => onChange(e.target.value)
        }
    };
    if(params.type){
        fieldProps.props.type = params.type;
        if(params.type === "date"){
            fieldProps.props.InputLabelProps = { shrink: true };
        }
    }
    return fieldProps;
};

export default useField;