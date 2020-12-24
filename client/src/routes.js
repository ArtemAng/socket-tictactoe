import {
    Switch,
    Route
} from 'react-router-dom';
import PlacePage from './pages/PlacePage';
import StartPage from './pages/StartPage';
export const useRoutes = ()=>{
    return(
        <Switch>
            <Route path='/game'>
                <PlacePage/>
            </Route>
            <Route path='/' component={StartPage}/>
        </Switch>
    )
}