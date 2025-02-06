import { useEffect } from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { createStore } from "redux"
var etatinitiale = {
    data1: [],
    loading: false,
    error: ""
}
function handlereducer(state = etatinitiale, action) {
    switch (action.type) {
        case "request":
            return { ...state, loading: true }
        case "getdata":
            return { ...state, loading: false, data1: action.playloadata }
        case "geterror":
            return { ...state, loading: false, error1: action.playloaerror }
        default:
            return state

    }
}
const Componeneaxios = () => {
    const { data1, loading } = useSelector((state => state))
    const dispatch = useDispatch()
    let url = "http://localhost:8000/experts2"
    function fetchTodos() {
        fetch(url)
            .then(response => response.json())
            .then(data => dispatch({ type: "getdata", playloadata: data }))
            .then(error => dispatch({ type: "geterror", playloaerror: error }))
    }

    useEffect(() => {
        fetchTodos();
    }, []);


    return (
        <>
            <ul>
                {
                    !loading && data1.map((obj, key) => (
                        <>
                            <li>{obj.evenements[0].theme}</li>
                            <li>{obj.evenements[0].date_debut}</li>
                            <li>{obj.evenements[0].cout_journalier}</li>
                            <li>{obj.evenements[0].duree}</li>
                            <li>{obj.evenements[0].description}</li>
                        </>

                    ))
                }
            </ul>
        </>
    )


}
const store = createStore(handlereducer)
const App = () => {
    return (
        <Provider store={store}>
            <Componeneaxios />
        </Provider>
    )
}
export default App;
