const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

function increase() {
    return {
        type: "INCREMENT"
    } 
}

function decrease() {
    return {
        type: "DECREMENT"
    } 
}

const initialState = {
    number: 0
}

function doMath(state = initialState,action) {
    switch (action.type) {
        case "INCREMENT":
            return Object.assign({},state,{number: state.number + 1});

        case "DECREMENT":
            return Object.assign({},state,{number: state.number - 1});

        default:
            return state;
    }
}

let store = Redux.createStore(doMath);

const mapDispatchToProps = (dispatch) => {
    return {
        add: () => {dispatch(increase())},
        substract: () => {dispatch(decrease())}
    }  
}

class ConnectedButton extends React.Component{
    constructor(props){
        super(props)

    }

    static propTypes = {
        mark: PropTypes.string.isRequired,
        add: PropTypes.func.isRequired,
        substract: PropTypes.func.isRequired
    }

    stuffToDo = () =>{
        {this.props.mark === "+" ? this.props.add() : this.props.substract()}
    }


    render(){
        return(
            <button onClick={this.stuffToDo}>
                {this.props.mark}
            </button>
        )
    }
}

const Button = ReactRedux.connect(null,mapDispatchToProps)(ConnectedButton);

const mapStateToProps = (state) => {
    return {
        number: state.number
    }  
}

class ConnectedBox extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <React.Fragment>
                Current value:
                {this.props.number}
            </React.Fragment>
        )
    }
}

const Box = ReactRedux.connect(mapStateToProps)(ConnectedBox)

class MyApp extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
        <React.Fragment>
            <Button mark={"-"}/>
            <Box/>
            <Button mark={"+"}/>
        </React.Fragment>
        )
    }
}

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <MyApp/>
    </ReactRedux.Provider>,
    document.getElementById("root")
)