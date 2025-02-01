import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import "bootstrap/dist/css/bootstrap.css";

const etatinitiale = {
    taille: "",
    genre: "",
    result: 0,
    erreur: "",
};

function handlereducer(state = etatinitiale, action) {
    switch (action.type) {
        case "updatetaille":
            return { ...state, taille: action.settaille, erreur: "" };

        case "validateTaille":
            const parsedTaille = parseInt(state.taille, 10);
            if (isNaN(parsedTaille) || parsedTaille < 150) {
                return { ...state, erreur: "La taille doit être un nombre supérieur ou égal à 150 cm." };
            }
            return { ...state, erreur: "" };

        case "updategenre":
            return { ...state, genre: action.setgenre };

        case "effacer":
            return { ...state, taille: "", result: 0, genre: "", erreur: "" };

        case "result":
            const { genre, taille } = state;
            const parsedResultTaille = parseInt(taille, 10);
            let pi;
            if (isNaN(parsedResultTaille) || parsedResultTaille < 150) {
                return { ...state, erreur: "La taille doit être un nombre supérieur ou égal à 150 cm." };
            }
            switch (genre) {
                case "homme":
                    pi = parsedResultTaille - 100 - (parsedResultTaille - 150) / 4;
                    break;
                case "femme":
                    pi = parsedResultTaille - 100 - (parsedResultTaille - 150) / 2.5;
                    break;
                default:
                    pi = "Genre non sélectionné";
                    break;
            }
            return { ...state, result: pi, erreur: "" };

        default:
            return state;
    }
}

const Comptaille = () => {
    const dispatch = useDispatch();
    const { taille, result, genre, erreur } = useSelector((state) => state);

    const handleTailleChange = (e) => {
        dispatch({ type: "updatetaille", settaille: e.target.value });
    };

    const handleTailleBlur = () => {
        dispatch({ type: "validateTaille" });
    };

    const handleGenreChange = (selectedGenre) => {
        dispatch({ type: "updategenre", setgenre: selectedGenre });
    };

    const reset = () => {
        dispatch({ type: "effacer" });
    };

    return (
        <div
            className={`container mt-4 p-4 rounded border ${genre === "femme" ? "bg-danger bg-opacity-25" : genre === "homme" ? "bg-primary bg-opacity-25" : ""
                }`}
        >
            <h2 className="text-center">Calcul le Poids idéal</h2>
            <div className="mb-3">
                <label htmlFor="tailleInput" className="form-label">
                    Entrez votre taille :
                </label>
                <input
                    type="text"
                    value={taille}
                    className="form-control"
                    onChange={handleTailleChange}
                    onBlur={handleTailleBlur}
                />
                {erreur && <small className="text-danger">{erreur}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Genre :</label>
                <div className="form-check">
                    <input
                        type="radio"
                        id="homme"
                        name="genre"
                        value="homme"
                        checked={genre === "homme"}
                        className="form-check-input"
                        onChange={() => handleGenreChange("homme")}
                    />
                    <label htmlFor="homme" className="form-check-label">
                        Homme
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        id="femme"
                        name="genre"
                        value="femme"
                        checked={genre === "femme"}
                        className="form-check-input"
                        onChange={() => handleGenreChange("femme")}
                    />
                    <label htmlFor="femme" className="form-check-label">
                        Femme
                    </label>
                </div>
                <div className="mb-3 d-flex justify-content-end">
                    {genre === "homme" && (
                        <img
                            src="homme.png"
                            alt="Homme"
                            className="img-thumbnail"
                            style={{ width: "150px" }}
                        />
                    )}
                    {genre === "femme" && (
                        <img
                            src="femme.png"
                            alt="Femme"
                            className="img-thumbnail"
                            style={{ width: "150px" }}
                        />
                    )}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="resultInput" className="form-label">
                    Résultat :
                </label>
                <input
                    id="resultInput"
                    type="text"
                    value={result}
                    placeholder="Votre PI est :"
                    className="form-control"
                    readOnly
                />
            </div>

            <div className="d-flex gap-2">
                <button
                    className="btn btn-primary"
                    onClick={() => dispatch({ type: "result" })}
                >
                    Calculer
                </button>
                <button className="btn btn-secondary" onClick={reset}>
                    Effacer
                </button>
            </div>
        </div>
    );
};

const store = createStore(handlereducer);

const Poidsideal = () => {
    return (
        <Provider store={store}>
            <Comptaille />
        </Provider>
    );
};

export default Poidsideal;
