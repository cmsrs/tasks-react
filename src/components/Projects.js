import React, { Component } from 'react';
import requireAuth from './requireAuth';
import { connect } from 'react-redux';
import * as actions from '../actions/projects';
import Header from './Header';
import Expire from '../helpers/Expire';

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
      if(this.state.projects.length && (!this.state.taskProjectId) ){
        this.setState({taskProjectId : this.state.projects[0].id});
      }
    });
  }

  handleAddProject = () => {
    const title = this.state.projTitle;
    this.props.saveProject({'title': title} , () => {
      this.props.getProjects( (d) => {
        this.setState({projects: d});
      });
    });

    this.setState({projTitle: ''});
  }

  handleChangeTitle = (event) => {
    let title = event.target.value
    this.setState({projTitle: title});
  }

  handleAddTask = () => {
    const name = this.state.taskName;
    const points = this.state.taskPoints;
    const projectId = this.state.taskProjectId;

    const task = {name: name, points: points, project_id: projectId};
    console.log(task);
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

  handleChangeProjectId = (event) => {
    let projectId = event.target.value
    //console.log('proij_id='+projectId);
    this.setState({taskProjectId : projectId});
  }

  render() {

    const projects =  this.state.projects;
    console.log(projects);

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

      msg = <Expire  delay={9000}><div className="alert alert-danger mb-4" role="alert">{msgHtml}</div></Expire>;
    }

    if(this.props.projectsRes && (this.props.projectsRes.success === true) ){
      msg = <Expire  delay={9000}><div className="alert alert-success  mb-4" role="alert">{this.props.projectsRes.message}</div></Expire>;
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
            <button className="btn btn-primary mt-2 mb-2"  onClick={this.handleAddProject}><i className="fas fa-plus"></i> Add project</button>
          </div>

          { projects.length &&
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

            <button id="add_menu" className="btn btn-primary mt-2 mb-2"  onClick={this.handleAddTask}><i className="fas fa-plus"></i> Add task</button>
          </div>
          }

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

export default connect(null, actions)(requireAuth(Projects));
