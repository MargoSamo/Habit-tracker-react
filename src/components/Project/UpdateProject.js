import React, { Component } from 'react';
import { getProject, createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateProject extends Component {

    constructor() {
        super();

        this.state = {
            id: "",
            name: "",
            day: "",
            done: "",
            value: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.errors){
            this.setState({ errors:nextProps.errors });

        }
        const {
            id,
            name,
            day,
            done,
            value
        } =nextProps.project;

        this.setState({
            id,
            name,
            day,
            done,
            value
        });
    }

    componentDidMount() {
    
        const { id } = this.props.match.params;
        this.props.getProject(id, this.props.history);

      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value})
      }

      onSubmit(e){
        e.preventDefault()

        const updateProject = {
            id: this.state.id,
            name: this.state.name,
            day: this.state.day,
            done: this.state.done,
            value: this.state.value
        };

        this.props.createProject(updateProject, this.props.history);
      }

  render() {
    const {errors} = this.state;
    return (
        <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center"> Update Habit form</h5>
                        <hr />
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control form-control-lg"
                                placeholder="Habit Name"
                                name="name" 
                                value={this.state.name}
                                disabled 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                type="text" 
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid":errors.value
                                })}  
                                placeholder="Value"
                                name="value"
                                value={this.state.value}
                                onChange={this.onChange}
                                 />
                                 {errors.value && (
                                    <div className="invalid-feedback">{errors.value}</div>
                                  )} 
                            </div>
                            
                            <div className="form-group">
                                <input   
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid":errors.done
                                })} 
                                placeholder="Done"
                                name="done"
                                value={this.state.done}
                                onChange={this.onChange}
                                />
                                {errors.done && (
                                    <div className="invalid-feedback">{errors.done}</div>
                                  )} 
                            </div>
                            <h6>Date</h6>
                            <div className="form-group">
                                <input type="date" 
                                className="form-control form-control-lg" 
                                name="day" 
                                value={this.state.day}
                                onChange={this.onChange}
                                />
                            </div>
                           

                            <input 
                            type="submit" 
                            className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}; 

const mapStateToProps = state => ({
    project: state.project.project,
    errors: state.errors
});
  

export default connect(
    mapStateToProps, 
    { getProject, createProject }
    )(UpdateProject);