import React from 'react'
import Morse from './ciphers/Morse';
import Caesar from './ciphers/Caesar';
import Atbash from './ciphers/Atbash';

import { AppBar, Toolbar, Typography, Container, Button, FormControl, MenuItem, InputLabel, Box, Radio, FormControlLabel, Select } from '@mui/material';
import { cipherSubmitHandler, logout } from '../../firebase';

import SavedCipher from '../components/SavedCipher';

const API_URL = "https://ciphertapi.herokuapp.com";
const structures = {
    "Morse": {
        text: "",
    },
    "Caesar": {
        text: "",
        n: 0,
        only_letters: false,
    },
    "Atbash": {
        text: "",
    }
}

export default function Dashboard(props) {
    const [method, setMethod] = React.useState("Morse");
    const [action, setAction] = React.useState("Encode");
    const [body, setBody] = React.useState(structures[method]);

    const URL = `${API_URL}/${method.toLowerCase()}/${action.toLowerCase()}`;

    async function requestHandler() {
        const response = await fetch(URL, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
        })
        const data = await response.text();

        if (!response.ok) {
            alert(data);
        } else {
            cipherSubmitHandler(method, action, data);
        }
    };

    function changeHandler(id, value) {
        setBody(oldState => {
            return {
                ...oldState,
                [id]: value,
            }
        })
    };

    function changeMethodHandler(event) {
        setMethod(event.target.value);
        setBody(structures[event.target.value]);
    }

    function changeActionHandler(event) {
        setAction(event.target.value);
    }

    const methods = {
        "Morse": <Morse data={body} changeHandler={changeHandler} submitHandler={requestHandler} />,
        "Caesar": <Caesar data={body} changeHandler={changeHandler} submitHandler={requestHandler} />,
        "Atbash": <Atbash data={body} changeHandler={changeHandler} submitHandler={requestHandler} />,
    };

    return (
        <Box sx={{
            display: 'flex',
            height: "100vh",
        }}>
            <AppBar>
                <Toolbar
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto 1fr",
                        alignItems: "center",
                    }}>
                    <Typography variant="h6" noWrap component="div">
                        Cipher API
                    </Typography>

                    <Box>
                        <FormControl >
                            <InputLabel id="method">Method</InputLabel>
                            <Select
                                labelId="method"
                                id="Method"
                                value={method}
                                label="method"
                                onChange={changeMethodHandler}
                                size="small"
                                sx={{ marginRight: "20px" }}
                            >
                                {Object.keys(methods).map(k => <MenuItem value={k} key={k}>{k}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControlLabel value="Encode" onChange={changeActionHandler} control={<Radio />} label="Encode" checked={action == "Encode"} />
                        <FormControlLabel value="Decode" onChange={changeActionHandler} control={<Radio />} label="Decode" checked={action == "Decode"} />
                    </Box>

                    <Button sx={{
                        width: "fit-content",
                        justifySelf: "end"
                    }}
                        onClick={logout}
                    >
                        Logout
                    </Button>

                </Toolbar>
            </AppBar>

            <Box
                component="main"
                sx={{
                    width: "100%",
                    bgcolor: 'background.default',
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                <Toolbar />
                <div style={{
                    display: "flex",
                    flexGrow: "1",
                }}>
                    <Box sx={{ paddingTop: "30px" }}>
                        <Container>
                            {methods[method]}
                        </Container>
                    </Box>

                    <Box sx={{
                        width: "1000px", backgroundColor: "#222", display: "flex", flexDirection: "column",
                    }}>
                        <Box sx={{
                            fontFamily: "monospace",
                            height: "300px",
                            backgroundColor: "black",
                            wordBreak: "break-all",
                            color: "#00ff00",
                            overflowY: "scroll",
                            p: 2,
                        }}>
                            curl -X POST {URL} -H {"Content-Type:application/json"} -d '{JSON.stringify(body)}'
                        </Box>
                        <Box sx={{
                            height: "100%",
                            display: "flex",
                            padding: "30px",
                        }}>
                            <div style={{
                                height: "500px",
                                width: "100%",
                                overflowY: "scroll",
                                alignSelf: "center",
                            }}>
                                {props.values && Object.keys(props.values).reverse().map(k =>
                                    <SavedCipher
                                        action={props.values[k].action}
                                        text={props.values[k].text}
                                        method={props.values[k].method}
                                    />
                                )}

                            </div>
                        </Box>
                    </Box>
                </div>
            </Box >

        </Box >
    )
};
