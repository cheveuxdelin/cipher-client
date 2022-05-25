export default function SavedCipher(props) {
    const colors = {
        Morse: "#C37D92",
        Atbash: "#218380",
        Caesar: "#E89005",
    };

    return <div style={{
        backgroundColor: "#aaa",
        padding: "5px 0",
        margin: "5px 0",
        backgroundColor: colors[props.method],
    }}>
        <p style={{
            padding: "0 10px",
            fontWeight: "500"
        }}>Method: {props.method}, Action: {props.action}, Text: {props.text}</p>
    </div>
}