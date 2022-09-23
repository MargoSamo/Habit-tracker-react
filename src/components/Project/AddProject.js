import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"; 
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";


class AddProject extends Component {
    constructor() {
        super()

        this.state={
            name: "",
            day: "",
            done: "",
            value: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const newProject ={
            name: this.state.name,
            day: this.state.day,
            done: this.state.done,
            value: this.state.value
        };

        this.props.createProject(newProject, this.props.history)

    }

  render() {
    const {errors} = this.state 

    return (
      <div>

      <div className="project">
      <div className="container">
          <div className="row">
              <div className="col-md-8 m-auto">
                  <h5 className="display-4 text-center"> Create Habit form </h5>
                  <hr />
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                          <input type="text" 
                          className={classnames("form-control form-control-lg ", {
                            "is-invalid": errors.name
                          }) }
                          placeholder="Habit name" 
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          />
                          {errors.name && (
                            <div className='invalid-feedback'>{errors.name}</div>
                          ) } 
                      </div>
                      <div className="form-group">
                          <input type="text" 
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.value
                          } )}
                          placeholder="Value"
                          name="value"
                          value={this.state.value}
                          onChange={this.onChange}
                          />
                          {errors.value && (
                            <div className='invalid-feedback'>{errors.value}</div>
                          )} 
                      </div>
                      
                      <div className="form-group">
                          <input className="form-control form-control-lg" 
                          placeholder="Done" 
                          name="done"
                          value={this.state.done}
                          onChange={this.onChange}
                          />
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
                      

                      <input type="submit" className="btn btn-primary btn-block mt-4" />
                  </form>
              </div>
          </div>
      </div>
  </div>
        
      </div>
    )
  }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createProject} 
    ) (AddProject);
