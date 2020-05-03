import React, { Component, Fragment } from 'react';

// Code Mirror
import Codemirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/abcdef.css';

// Bootstrap and Material UI
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import { Select, MenuItem, AppBar, Typography, Toolbar, InputLabel, FormControl } from '@material-ui/core';

// Code Mirror Modes
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike');

class App extends Component {
  constructor(){
    super()
    this.state = {
      text: "def a(): print('Kamal')"
    }
  }
  componentDidMount () {
  }

  updateCode = (newCode) => {
		this.setState( {
			text: newCode
		} );
	}

  render(){
    var options = {
      theme: "abcdef",
      lineNumbers: true,
      mode: "python"
    };

    return (
      <Fragment>
        <AppBar position="static" style={{backgroundColor: "#1976D3"}}>

        <Toolbar variant="dense">
          <Typography variant="h6">
            Online Complier
          </Typography>
        </Toolbar>
        </AppBar>
        <br/>
        <Container>
          <FormControl style={{minWidth: 220, marginBottom: 16}}>
            <InputLabel>Select languege</InputLabel>
            <Select value="c">
              <MenuItem value="c">C</MenuItem>
              <MenuItem value="c++">C++</MenuItem>
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="javscript">Javscript</MenuItem>
            </Select>
          </FormControl>
          <br/>
          <Codemirror value={this.state.text} options={options} onChange={this.updateCode}/>
          
        </Container>
      </Fragment>
    );
  }
}

export default App;
