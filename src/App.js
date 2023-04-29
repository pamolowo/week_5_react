import Form from './Form'
import './App.css';

function App() {

  const loginToApp = (myForm) => {
    console.log('Sending form data...');
    console.log(myForm);
  }
         
  return (
    <div className="App">
     <Form   submitForm={loginToApp} />
    </div>
  );
}

export default App;