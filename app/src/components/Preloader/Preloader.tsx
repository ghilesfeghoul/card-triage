import logo from '../../logo.svg';
import './Preloader.css';
export function Preloader() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
        </div>
    );
}