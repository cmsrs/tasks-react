import React, { Component } from 'react';
import requireAuth from './requireAuth';
import { connect } from 'react-redux';
import * as actions from '../actions/projects';
import Header from './Header';
import Expire from '../helpers/Expire';
import './main.css';

class Projects extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projTitle : '',
      taskName : '',
      taskPoints : '',
      taskProjectId : '',
      projects : {}
    };

    this.props.getProjects( (d) => {
      this.setState({projects: d});
    });
  }

  handleAddProject = () => {
    const title = this.state.projTitle;
    this.props.saveProject({title: title} , () => {
      this.props.getProjects( (d) => {
        this.setState({projects: d});
        if(d.length && (!this.state.taskProjectId) ){
          this.setState({taskProjectId : d[0].id});
        }
      });
    });

    this.setState({projTitle: ''});
  }

  handleChangeTitle = (event) => {
    let title = event.target.value
    this.setState({projTitle: title});
  }

  handleChangeTitleShow = (event) => {
    let title = event.target.value;
    const projectid = parseInt(event.target.attributes.getNamedItem('data-projectid').value.replace( /^\D+/g, ''));

    let newProj = [];
    for(let obj of this.state.projects){
      let copy = Object.assign({}, obj);
      if( obj.id === projectid ){
        copy.title = title;
      }
      newProj.push(copy);
    }
    this.setState({projects: newProj});
  }

  handleAddTask = () => {
    const name = this.state.taskName;
    const points = this.state.taskPoints;
    const projectId =  this.state.taskProjectId ? this.state.taskProjectId : (this.state.projects ?  this.state.projects[0].id : '');

    const task = {name: name, points: points, project_id: projectId};
    //console.log(task);
    this.props.saveTask(task , () => {
      this.props.getProjects( (d) => {
        this.setState({projects: d});
      });
    });

    this.setState({taskName: '', taskPoints: ''});
  }

  handleChangeName = (event) => {
    let name = event.target.value
    this.setState({taskName: name});
  }

  handleChangePoints = (event) => {
    let points = event.target.value
    this.setState({taskPoints: points});
  }

  handleChangeNameShow = (event) => {
    const name = event.target.value;
    const projectid = parseInt(event.target.attributes.getNamedItem('data-projectid').value.replace( /^\D+/g, ''));
    const taskid = parseInt(event.target.attributes.getNamedItem('data-taskid').value.replace( /^\D+/g, ''));

    let newProj = [];
    for(let obj of this.state.projects){
      let copyProj = Object.assign({}, obj);
      if( obj.id === projectid ){
        let newTasks = [];
        for(let task of obj.tasks){
          let copyTask = Object.assign({}, task);
          if( task.id === taskid ){
            copyTask.name = name;
          }
          newTasks.push(copyTask);
        }
        copyProj.tasks = newTasks;
      }
      newProj.push(copyProj);
    }
    this.setState({projects: newProj});
  }

  //dry - todo
  handleChangePointsShow = (event) => {
    const points = event.target.value;
    const projectid = parseInt(event.target.attributes.getNamedItem('data-projectid').value.replace( /^\D+/g, ''));
    const taskid = parseInt(event.target.attributes.getNamedItem('data-taskid').value.replace( /^\D+/g, ''));

    let newProj = [];
    for(let obj of this.state.projects){
      let copyProj = Object.assign({}, obj);
      if( obj.id === projectid ){
        let newTasks = [];
        for(let task of obj.tasks){
          let copyTask = Object.assign({}, task);
          if( task.id === taskid ){
            copyTask.points = points;
          }
          newTasks.push(copyTask);
        }
        copyProj.tasks = newTasks;
      }
      newProj.push(copyProj);
    }
    this.setState({projects: newProj});
  }


  handleChangeProjectId = (event) => {
    let projectId = event.target.value
    this.setState({taskProjectId : projectId});
  }

  editProj = (projectid) => {
    let copyProj = '';
    for(let obj of this.state.projects){
      if( obj.id === projectid ){
        copyProj = {id:obj.id, title: obj.title};
        break;
      }
    }
    if(copyProj){
      this.props.saveProject(copyProj , () => {
        this.props.getProjects( (d) => {
          this.setState({projects: d});
        });
      });
    }
  }

  delProj = (projectId) => {
    this.props.deleteProject(projectId, () => {
      this.props.getProjects( (d) => {
        this.setState({projects: d});
      });
    });
  }

  delTask = (taskId) => {
    this.props.deleteTask(taskId, () => {
      this.props.getProjects( (d) => {
        this.setState({projects: d});
      });
    });
  }

  editTask = ( taskId ) => {
    let copyTask = '';
    for(let obj of this.state.projects){
      for(let task of obj.tasks){
        if( task.id === taskId ){
          copyTask = {id:task.id, name: task.name, points:task.points, project_id: task.project_id };
        }
      }
    }
    if(copyTask){
      this.props.saveTask(copyTask, () => {
        this.props.getProjects( (d) => {
          this.setState({projects: d});
        });
      });
    }
  }


  render() {
    const projects =  this.state.projects;

    let msg = '';
    if(this.props.projectsRes && (this.props.projectsRes.success  === false)  ){

      let msgHtml = ''

      if( (typeof this.props.projectsRes.message === "object" || typeof this.props.projectsRes.message === 'function') && (this.props.projectsRes.message !== null) ){
          for(let index in this.props.projectsRes.message){
              msgHtml += this.props.projectsRes.message[index][0]+ " ";
          }
      }else if(Array.isArray(this.props.projectsRes.message)){
        for(let index in this.props.projectsRes.message){
            msgHtml += index + ": " + this.props.projectsRes.message[index][0]+ "  ";
        }
      }else{
        msgHtml = this.props.projectsRes.message;
      }

      msg = <Expire delay={9000}><div className="alert alert-danger mb-4" role="alert">{msgHtml}</div></Expire>;
    }

    if(this.props.projectsRes && (this.props.projectsRes.success === true) ){
      msg = <Expire delay={90000}><div className="alert alert-success  mb-4" role="alert">{this.props.projectsRes.message}</div></Expire>;
    }

    return (
      <div>
        <Header />
        <div  className="mt-3  container">
          <h2 className="mb-3">Projects and tasks</h2>

          <div className="wrapMsg">
                 {msg}
          </div>
          <div className="row mt-4">
            <input type="text" placeholder="Project title" name="title" key="title" className="mr-2"
                      onChange={this.handleChangeTitle}  value={this.state.projTitle} />
            <button className="btn btn-primary mt-2 mb-2"  onClick={this.handleAddProject}>Add project</button>
          </div>

          { !!projects.length &&
            <div className="row mt-3">
              <input type="text" placeholder="Task name" name="name" key="name" className="mr-2"
                        onChange={this.handleChangeName}  value={this.state.taskName} />
              <input type="text" placeholder="Task points" name="points" key="points" className="mr-2"
                        onChange={this.handleChangePoints}  value={this.state.taskPoints} />
              <select name="project_id" onChange={this.handleChangeProjectId}   className="mr-2" value={this.state.taskProjectId} >
                  {projects.map(project =>
                    <option key={project.id} value={project.id || ''}>{project.title || ''}</option>
                  )}
              </select>

              <button id="add_menu" className="btn btn-primary mt-2 mb-2"  onClick={this.handleAddTask}>Add task</button>
            </div>
          }

          <div className="row mt-3">
          { !!projects.length && projects.map(project =>
            <div  className="mt-3  container" key={'wrap_'+project.id}>
              <input type="text"  key={'proj_'+project.id} data-projectid={'project_id_'+project.id} placeholder="Project title" name="title" className="m-2"
                        onChange={this.handleChangeTitleShow}  value={project.title} />
                        <span onClick={this.editProj.bind(this, project.id)} ><i className="m-1 far fa-edit cursor-pointer"/></span>
                        <span onClick={this.delProj.bind(this, project.id)}><i className="m-1 fas fa-trash cursor-pointer"  aria-hidden="true"/></span>
              <ul>
              {project.tasks.map(task =>
                  <li key={'wrap_task_'+project.id+'_'+task.id}>
                    <input type="text" data-projectid={'project_id_'+project.id} data-taskid={'task_id_'+task.id}  placeholder="Task name" name="name" key="name" className="m-1"
                              onChange={this.handleChangeNameShow}  value={task.name} />
                    <input type="text" data-projectid={'project_id_'+project.id} data-taskid={'task_id_'+task.id}  placeholder="Task points" name="points" key="points" className="m-1"
                              onChange={this.handleChangePointsShow}  value={task.points} />

                    <span onClick={this.editTask.bind(this, task.id)}><i className="m-1 far fa-edit cursor-pointer"/></span>
                    <span onClick={this.delTask.bind(this, task.id)}><i className="m-1 fas fa-trash cursor-pointer"  aria-hidden="true"/></span>
                  </li>
              )}
              </ul>
            </div>
          )}
          </div>


        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects.projects,
    projectsRes: state.projects.projects_res
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Projects));
