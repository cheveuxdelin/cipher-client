import { Button, Divider, Typography } from "@mui/material";
import { TextField } from "@mui/material";

export default function Atbash(props) {
    return <>
        <Typography variant="h2" gutterBottom >Atbash</Typography>
        <Typography variant="h4" gutterBottom>Athbash is a simple cypher method that maps every letter to another... <br></br> A-{">"}Z, B-{">"}Y and so on </Typography>
        <Typography variant="body1">Due to the fact that there is only one way to perform this, the Atbash cipher provides no communications security, as it lacks any sort of key. If multiple collating orders are available, which one was used in encryption can be used as a key, but this does not provide significantly more security, considering that only a few letters can give away which one was used.</Typography>
        <Divider sx={{ margin: "20px 0" }} />
        <TextField
            id="text"
            label="Text"
            placeholder="Text to process"
            multiline
            rows={4}
            required
            value={props.data["text"]}
            onChange={event => props.changeHandler("text", event.target.value)}
            fullWidth
            sx={{
                marginBottom: "20px",
            }}
        />

        <Button variant="contained" onClick={props.submitHandler} sx={{
            width: "300px",
            height: "50px",
            display: "block",
            margin: "auto",
            marginBottom: "20px"

        }}>Go!</Button>

    </>
}