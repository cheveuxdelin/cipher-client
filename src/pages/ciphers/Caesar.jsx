import { Button, Divider, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Switch } from "@mui/material";
import { FormControlLabel } from "@mui/material";

export default function Caesar(props) {
    return <>
        <Typography variant="h2" gutterBottom >Caesar</Typography>
        <Typography variant="h4" gutterBottom>Caesar applies an offset on every letter by n places</Typography>
        <Typography variant="body1">The Caesar cipher is named after Julius Caesar, who, according to Suetonius, used it with a shift of three (A becoming D when encrypting, and D becoming A when decrypting) to protect messages of military significance. While Caesar's was the first recorded use of this scheme, other substitution ciphers are known to have been used earlier.</Typography>
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

        <TextField
            type="number"
            id="offset"
            label="offset"
            placeholder="N Offset"
            required
            value={props.data["n"]}
            onChange={event => props.changeHandler("n", +event.target.value)}
            fullWidth

            sx={{
                marginBottom: "20px"
            }}
        />

        <FormControlLabel control={
            <Switch
                checked={props.data["only_letters"]}
                onChange={event => props.changeHandler("only_letters", event.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
                label="Only letters"
            />
        } label="Only letters" />

        <Button variant="contained" onClick={props.submitHandler} sx={{
            width: "300px",
            height: "50px",
            display: "block",
            margin: "auto",
            marginBottom: "20px"
        }}>Go!</Button>
    </>
}