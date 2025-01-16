
import { useEffect, useState, useCallback } from 'react';
import Input from './components/Input';
import Button from './components/Buttons';
import { Container, Content, Row} from './styles';


function App() {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');

  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber('0');
    setOperation('');
  }

  const handleAddNumber = useCallback((num) => {
    setCurrentNumber((prev) => `${prev === '0' ? '' : prev}${num}`);
  }, []);

  //função de soma envolvida com usecallback
  const handleSumNumbers = useCallback(() => {
    if(firstNumber === '0'){
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('+');
    }else{
      const result = Number(firstNumber) + Number(currentNumber);
      setCurrentNumber(String(result));
      setOperation('');
    }
  }, [firstNumber, currentNumber]);

  //função de subtração envolvida com usecallback
  const handleMinusNumbers = useCallback(() => {
    if(firstNumber === '0'){
        setFirstNumber(String(currentNumber));
        setCurrentNumber('0')
        setOperation('-')
    }else {
      const result = Number(firstNumber) - Number(currentNumber);
      setCurrentNumber(String(result))
      setOperation('')
    }
  }, [firstNumber, currentNumber]);

  //função de multiplicação envolvida com usecallback
  const handleMultiplicationNumbers = useCallback(() => {
    if(firstNumber === '0'){
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('*');
    }else {
      const result = Number(firstNumber) * Number(currentNumber);
      setCurrentNumber(String(result));
      setOperation('');
    }
  }, [firstNumber, currentNumber]);

  //função de divisão envolvida com usecallback
  const handleDivisionNumbers = useCallback(() => {
    if (firstNumber === '0'){
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('/');

    }else{
      const result = Number(firstNumber) / Number(currentNumber);
      setCurrentNumber(String(result));
      setOperation('');
    }
  }, [firstNumber, currentNumber]);
  
  const handleEquals = useCallback(() => {
  if (firstNumber !== '0' && operation !== '' && currentNumber !== '0') {
    let result;
    switch (operation) {
      case '+':
        result = Number(firstNumber) + Number(currentNumber);
        break;
      case '-':
        result = Number(firstNumber) - Number(currentNumber);
        break;
      case '*':
        result = Number(firstNumber) * Number(currentNumber);
        break;
      case '/':
        result = Number(firstNumber) / Number(currentNumber);
        break;
      default:
        return;
    }
    setCurrentNumber(String(result)); // Atualiza com o resultado
    setFirstNumber('0'); // Limpa o primeiro número
    setOperation(''); // Reseta a operação
  }
}, [firstNumber, operation, currentNumber]);


  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      // console.log(`Tecla pressionada: ${key}`);

      if (!isNaN(key)) {
        handleAddNumber(key);
      } else if (key === 'Backspace') {
        setCurrentNumber((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
      } else if (key === 'c') {
        handleOnClear(); // Chama o reset
      } else if (key === '=' || key === 'Enter') {
        handleEquals();
      } else if (key === '+') {
        handleSumNumbers();
      } else if (key === '-') {
        handleMinusNumbers();
      } else if (key === '*') {
        handleMultiplicationNumbers();
      } else if (key === '/') {
        handleDivisionNumbers();
      }
    };

    // Adiciona o evento ao montar o componente
    window.addEventListener('keydown', handleKeyPress);

    // Remove o evento ao desmontar o componente
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentNumber, handleAddNumber, handleEquals, handleSumNumbers, handleMinusNumbers, handleMultiplicationNumbers, handleDivisionNumbers]);

  return (
    <Container >
      <Content>
        <Input value={currentNumber}/>
        <Row>
          <Button label="ce" onClick={() => handleAddNumber('ce')}/>
          <Button label="%" onClick={() => handleAddNumber('%')}/>
          <Button label="c" onClick={handleOnClear}/>
          <Button label="/" onClick={handleDivisionNumbers}/>
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')}/>
          <Button label="8" onClick={() => handleAddNumber('8')}/>
          <Button label="9" onClick={() => handleAddNumber('9')}/>
          <Button label="*" onClick={handleMultiplicationNumbers}/>
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')}/>
          <Button label="5" onClick={() => handleAddNumber('5')}/>
          <Button label="6" onClick={() => handleAddNumber('6')}/>
          <Button label="-" onClick={handleMinusNumbers}/>
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')}/>
          <Button label="2" onClick={() => handleAddNumber('2')}/>
          <Button label="3" onClick={() => handleAddNumber('3')}/>
          <Button label="+" onClick={handleSumNumbers}/>
        </Row>
        <Row>
          <Button label="+/-" onClick={() => handleAddNumber('+/-')}/>
          <Button label="0" onClick={() => handleAddNumber('0')}/>
          <Button label="," onClick={() => handleAddNumber(',')}/>
          <Button label="=" onClick={handleEquals}/>
        </Row>
      </Content>
    </Container>
  );
}

export default App;
