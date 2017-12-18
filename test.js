class ClickButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {out: []};
    };
    addTask = () => {
        this.setState(prevState => {
            return {out: [...prevState.out, this.refs.task.value]}
        });
    };
    deleteTask = index => {
        this.setState(prevState =>{
            return prevState.out.splice(index, 1);
        });
    };
    createTasks = () =>{
        console.log(this.props);
        return Array.from(new Array(this.state.out.length), (cur, i) => {
            return <div className={'task'}>
                <h5>{this.state.out[i]}</h5>
                <button onClick={() => this.deleteTask(i)}>Удалить</button>
            </div>;
        });
    };
    render() {
        return <div>
            <div>
                <input ref='task'
                       className={"inputText"}
                       type={"text"}
                       placeholder={"Напиши что-то"} />
                <button onClick={this.addTask}>Добавить</button>
            </div>
            <div>{this.createTasks()}</div>
        </div>;
    };
}
ReactDOM.render(
    <ClickButton />,
    document.getElementById('root')
);