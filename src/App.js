import React, { Component, Fragment } from 'react';

// Code Mirror
import Codemirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/abcdef.css';

// Bootstrap and Material UI
import 'bootstrap/dist/css/bootstrap.css';
import {
    AppBar, Typography,
    Toolbar, InputLabel,
    Select, MenuItem,
    FormControl, Button,
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
    Grid, TextField,
    CircularProgress, Paper
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Code Mirror Modes
require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike');

class App extends Component {
    constructor() {
        super()
        this.state = {
            text: "",
            lang: "c",
            inputValues: "",
            progress: false,
            result: ""
        }
    }

    updateCode = (newCode) => {
        this.setState({ text: newCode });
    }

    onLanguageChange = (e) => {
        this.setState({ lang: e.target.value });
    }

    onInputValue = (e) => {
        this.setState({ inputValues: e.target.value });
    }

    onRun = () => {
        this.setState({ progress: true });

        fetch('http://jayprakash-se.xyz/compiler/exe.php', {
            method: 'post',
            body: JSON.stringify(this.state),
            header: {
                "content-type": "application/json"
            }
        }).then(function (response) {
            return response.json();
        }).then((data) => {
            this.setState({ progress: false, result: data.output });
            console.log(data.output);
        });
    }

    render() {
        const modeMap = {
            c: "clike",
            cpp: "clike",
            python3: "python"
        }

        const options = {
            theme: "abcdef",
            lineNumbers: true,
            mode: modeMap[this.state.lang]
        };

        return (
            <Fragment>
                <AppBar position="static" style={{ backgroundColor: "#1976D3" }}>
                    <Toolbar variant="dense">
                        <Typography variant="h6"> Online Complier </Typography>
                    </Toolbar>
                </AppBar>
                <br />
                <div className="container">
                    <FormControl style={{ minWidth: 220, marginBottom: 16 }}>
                        <InputLabel>Select languege</InputLabel>
                        <Select value={this.state.lang} onChange={this.onLanguageChange}>
                            <MenuItem value="c">C</MenuItem>
                            <MenuItem value="cpp">C++</MenuItem>
                            <MenuItem value="python3">Python3</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <Codemirror value={this.state.text} options={options} onChange={this.updateCode} />
                    <br />
                    <Grid container justify="space-between">
                        <Grid item xs={6}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Input Value</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <TextField
                                        multiline
                                        fullWidth
                                        rows="4"
                                        variant="outlined"
                                        onChange={this.onInputValue}
                                        placeholder="Inputs per line"
                                    />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="outlined" color="primary" onClick={this.onRun}>Comiple & Run</Button>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <Typography variant="h6">Result:</Typography>
                    <Grid container justify="center">
                        {this.state.progress ? <CircularProgress color="secondary" /> : ''}
                    </Grid>
                    {this.state.result ?
                        <Paper variant="outlined" elevation={3} style={{ color: 'green' }}>
                            <p style={{ marginRight: 10 }}>{this.state.result}</p>
                        </Paper>
                        : ''
                    }
                </div>
            </Fragment>
        );
    }
}

export default App;
