import logo from './logo.svg';
import './App.css';
import Card from './components/ui/card'; 
import Counter from './components/ui/Counter';
import List from './components/ui/List';

function App() {
  return (
    <>
      <Card
        name="Dado"
        description="This is a description of the card."
      />
      <Counter />
      <List />
    </>
  );
}

export default App;
