class ClickButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {all: []};
    };
    addTask = () => {
        this.setState(prevState => {
            return {all: [...prevState.all, {value: this.refs.task.value, done: false, checked: false, hide: false}]}
        });
    };
    deleteTask = index => {
        this.setState(prevState =>{
            prevState.all.splice(index, 1);
            return {all: prevState.all}
        });
    };
    checked = index => {
        this.setState(prevState => {
            prevState.all[index].checked = !prevState.all[index].checked;
            prevState.all[index].done = !prevState.all[index].done;
            return {all: prevState.all};
        });
        console.log(this.state.all)
    };
    createTasks = () =>{
        return Array.from(new Array(this.state.all.length), (cur, i) => {
            let className = this.state.all[i].done ? 'cross' : 'notCross';
            if(this.state.all[i].hide) return;
            return <tr>
                <td>
                    <input id={i} onChange={() => this.checked(i)} className={'check'} type={'checkbox'}/>
                    <h5 className={className}>{this.state.all[i].value}</h5>
                </td>
                <td><button className={'buttonDelete'} onClick={() => this.deleteTask(i)}/></td>
            </tr>
        });
    };
    allTasks = () => {
        this.setState(prevState => {
            prevState.all.forEach(cur => {
                cur.hide = false;
            });
            return prevState.all;
        })

    };
    doneTasks = () => {
        this.setState(prevState => {
            prevState.all.forEach(cur => {
                cur.hide = !cur.done;
            });
            return {all: prevState.all}
        })
    };
    notDoneTasks = () => {
        this.setState(prevState => {
            prevState.all.forEach(cur => {
                cur.hide = !!cur.done;
            });
            return {all: prevState.all}
        })
    };
    render() {
        return <div>
            <table>
                <tr className={'addTask'}>
                    <td>
                        <input ref='task'
                               className={"inputText"}
                               type={"text"}
                               placeholder={"Напиши что-то"} />
                    </td>
                    <td>
                        <button className={'buttonAdd'} onClick={this.addTask}>Добавить</button>
                    </td>
                </tr>
                {this.createTasks()}
            </table>
            <table className={'info'}>
                <tr>
                    <td>Количество: {this.state.all.length}</td>
                    <td><input onChange={this.allTasks} type={'radio'}/>Все</td>
                    <td><input onChange={this.doneTasks} type={'radio'}/>Сделаные</td>
                    <td><input onChange={this.notDoneTasks} type={'radio'}/>Не сделаные</td>
                </tr>
            </table>
        </div>

    };
}
ReactDOM.render(
    <ClickButton />,
    document.getElementById('root')
);