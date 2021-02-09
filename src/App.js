import Collection from './components/Collection'


import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-box">
          <h1 className="App-logo">The Movie Finder</h1>
          <nav className="App-nav">
            <ol className="App-nav-links">
              <li>Movies</li>
              <li>TV shows</li>
              <li>Actors</li>
            </ol>
            <button className="App-nav-session">Sign in</button>
          </nav>
        </div>
      </header>
      <section className="App-body">
        <Collection />
      </section>

      <footer className="App-footer">
        The Movie Finder
      </footer>
    </div>
  );
}

export default App;
