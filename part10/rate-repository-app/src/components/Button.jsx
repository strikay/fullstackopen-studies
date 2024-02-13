import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const Button = ({onPress, label, backgroundColor, noLeftMargin }) => {
    const styles = StyleSheet.create({
        buttonStyle: {
            padding:15, 
            margin:15, 
            flexGrow:1, 
            borderRadius:5,
            marginLeft: noLeftMargin ? 0 : 15,
            backgroundColor: backgroundColor
                ? backgroundColor
                :theme.colors.primary, 
            color:'white'
        }
    });
    return (
        <Pressable onPress={onPress} style={styles.buttonStyle}>
            <Text style={{color:'white', alignSelf:'center', fontSize: theme.fontSizes.subheading, fontWeight:theme.fontWeights.bold}}>{label}</Text>
        </Pressable>
    )
}

export default Button;