import {Component} from 'libs/base';
import api from 'libs/api';

let s = require('./App.scss?local');

import HeadNav from 'components/HeadNav/HeadNav';

export default class extends Component {
	componentDidMount() {
	   	this.loading();
      
	}
  constructor(props) {
    super(props);


    this.createItem = this.createItem.bind(this);
    this.state = {
      todos: []
    }
  }

	loading (){
    api.getHeadData().then(data => {
      this.setState({headdatas: data, loaded:true});
    }).catch(() => this.setState({request: false}));
    return false;
	}
  
  onMouseHeadNav(){
    console.log('aaa')
  }


  createItem(e) {
    if(e.key == 'Enter'){
        this.setState({
          todos: [...this.state.todos, {"id": this.state.todos.length, "content": e.target.value, "status": false}]
        })
        e.target.value = '';
      }
  }

  deleteItem(id) {
    let {todos}= this.state;

    this.setState({
      todos: todos.filter(todo =>
        todo.id !== id
      )
    })
  }

  changeStatus(id) {
    let {todos}= this.state;

    this.setState({
      todos: todos.map(todo => ({
       id: todo.id,
       content: todo.content,
       status: todo.id === id ? !todo.status : todo.status
      }))
    })
  }
  
	render() {  
    let {loaded}= this.state;
    
		return <div>
      {loaded ? this.renderHeader() : ''}
      {this.renderNav()}
      {this.renderBody()}
    </div>
	}
  //header
  renderHeader() {
    let {headdatas,loaded}= this.state;

    return <div className={s.head_container}>
      <ul className={s.head_center}>
        {headdatas.map(headdata=>{
         let cn = [s.head_li];
          if (headdata.position === 'left') cn.push(s.left);
          if (headdata.position === 'right') cn.push(s.right);

          if (headdata.data !== undefined){
            return <li className={this.classSet(cn)} key={headdata.id} onMouseEnter={this.onMouseHeadNav.bind(this)}>{headdata.name}<span className={s.pass_x_t}></span></li>
          }else{
            return <li className={this.classSet(cn)} key={headdata.id}>{headdata.name}</li>
          }
        })}
      </ul>
    </div>
  }
  //nav
  renderNav() {
    return <div className={s.nav_container}>
        <ul className={s.nav_center}>
          <h1>沪江社团</h1>
          <img src="../../images/slogan.png" />
          <li className={s.nav_li}><div></div>更多</li>
          <li className={s.nav_li}><div></div>商城</li>s
          <li className={s.nav_li}><div></div>发现社刊</li>
          <li className={s.nav_li}><div></div>发现社团</li>
          <li className={s.nav_li}><div></div>我的社团</li>
          <li className={s.nav_li}><div></div>首页</li> 
          </ul>
      </div>
  }
  //body
  renderBody() {
    let {todos}= this.state;

    return <div className={s.body_container}>
        <h2 className={s.todos_label}>todos</h2>
        <input type="text" className={s.todos_input} placeholder="What needs to be done?" onKeyPress={this.createItem}/>
        <div className={s.todos_container}>
          <ul className={s.todo_li}>
              {todos.map(todo=>{
                let status = todo.status ? [s.complete]: '';
                  return <li key={todo.id}>
                    <input className={s.toggle} type="checkbox" checked={todo.status} onClick={this.changeStatus.bind(this, todo.id)}/>
                    <span className={this.classSet(status)}>{todo.content}</span>
                    <i className={s.delete} onClick={this.deleteItem.bind(this, todo.id)}>x</i>
                  </li>
              })}
          </ul>
          <div className={s.container_feature}>
            <span>{todos.length} items left</span>
          </div>
        </div>
    </div>
  }
}