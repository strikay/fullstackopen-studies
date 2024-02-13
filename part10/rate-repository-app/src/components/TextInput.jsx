import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   
});

styles;

const TextInput = ({ style, error, ...props }) => {
    error;
    const textInputStyle = [style];
    
    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;