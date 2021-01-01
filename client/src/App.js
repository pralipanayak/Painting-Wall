// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';
import PaintingsPage from './pages/paintings';
import PaintingPage from './pages/painting';
import SignupPage from './pages/signup';
import Root from './root';
import axios from 'axios';
import NavbarComponent from './components/Navbar';
import CreatePostPage from './pages/createPost';
import MyWallPage from './pages/myWall';

const App = () => {
    return (
        <div className="App">
            <NavbarComponent />
            <Switch>
                <Route exact path="/" component={PaintingsPage}></Route>
                <Route
                    exact
                    path="/paintings"
                    component={PaintingsPage}
                ></Route>
                <Route exact path="/login" component={LoginPage}></Route>

                <Route exact path="/signup" component={SignupPage}></Route>
                <Route exact path="/upload" component={CreatePostPage}></Route>
                <Route exact path="/myWall" component={MyWallPage}></Route>
                <Route
                
                    path="/paintings/:painting_id"
                    component={PaintingPage}
                ></Route>

                {/* <Route
                    exact
                    path="/paintings"
                    component={PaintingsPage}
                ></Route> */}

                <Route render={() => <h1>404 Not Found</h1>} />
            </Switch>
        </div>
    );
};

export default App;
