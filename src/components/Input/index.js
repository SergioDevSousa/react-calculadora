import { InputContainer } from './styles';

function Input ({value}){
    return (
        <InputContainer>
            <input disabled value = {value}/>
        </InputContainer>
    );
}

export default Input;