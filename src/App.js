import Fetcher from './components/Main.js';
import './style/style.css';
import Header from './components/Header';
import Footer from './components/Footer.js';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Fetcher></Fetcher>
            <Footer></Footer>
        </div>
    );
}

export default App;
