import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import LineChart from './components/line-chart';
import Table from './components/table';

function App() {
  return (
    <div className="App">
      <Header />
      <LineChart />
      <Table />
      <Footer />
    </div>
  );
}

export default App;
